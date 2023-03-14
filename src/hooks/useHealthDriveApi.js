/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ethers } from 'ethers';
import axios from 'axios';

const baseUrl = 'https://hewa-service.herokuapp.com';
// const baseUrl = 'http://localhost:3011';

const signResult = async (pk, result, guid) => {
  const hash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(`${result}${guid}`),
  );

  const wallet = new ethers.Wallet(pk);

  const signature = await wallet.signMessage(ethers.utils.arrayify(hash));

  return {
    deviceAddress: wallet.address,
    signature,
  };
};

const useHealthDriveApi = (pk) => {
  const calculateCid = async (result) => {
    const { data } = await axios.post(`${baseUrl}/api/v1/device/calculate-cid`, {
      result
    });
    const { cid } = data;

    return cid;
  };
  const uploadResult = async (uuid, fhirRecord) => {
    const stringifiedResult = JSON.stringify(fhirRecord);
    const resultAsBuffer = Buffer.from(stringifiedResult);
    const cid = await calculateCid(stringifiedResult);
    try {
      const { deviceAddress, signature } = await signResult(
        pk,
        cid,
        uuid,
      );
      await axios.post(`${baseUrl}/api/v1/device/upload-result`, {
        guid: uuid, result: cid, stringifiedResult: resultAsBuffer.toString(), deviceAddress, signature
      });
    } catch (err) {
      await axios.post(`${baseUrl}/api/v1/healthcheck`, {
        guid: uuid, msg: err.message
      });
    }
  };
  return {
    uploadResult
  };
};

export default useHealthDriveApi;