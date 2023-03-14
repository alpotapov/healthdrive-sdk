/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import PropTypes from 'prop-types';

import HealthDriveQrCode from './HealthDriveQrCode';
import useHealthDriveApi from '../hooks/useHealthDriveApi';

import XMark from '../assets/XMark.png';
import CheckMark from '../assets/CheckMark.png';

const UploadToHealthDrive = ({ uuid, fhirRecord, testType, pk }) => {
  const { uploadResult } = useHealthDriveApi(pk);

  const [uploadState, setUploadState] = React.useState('idle');

  const onUploadClick = () => {
      uploadResult(uuid, fhirRecord).then(() => {
        setUploadState('success');
      })
      .catch(() => {
        setUploadState('failed');
        setTimeout(() => {
          setUploadState('idle');
        }, 3000);
      });
  };

  const controlElement = () => {
    switch (uploadState) {
      case 'success':
        return (
          <div style={{
            background: '#F94A4A', borderRadius: "10px", marginTop: "10px", width: "150px", height: "50px", display: "flex", justifyContent: "space-around", alignItems: "center"
          }}>
            <img src={CheckMark} />
          </div>
        );
      case 'failed':
        return (
          <div style={{
            background: '#F94A4A', borderRadius: "10px", marginTop: "10px", width: "150px", height: "50px", display: "flex", justifyContent: "space-around", alignItems: "center"
          }}>
            <img src={XMark} />
          </div>
        );
      case 'idle':
        return (
          <div style={{
            background: '#F94A4A', borderRadius: "10px", marginTop: "10px", width: "150px", height: "50px", display: "flex", justifyContent: "space-around", alignItems: "center"
          }} onClick={onUploadClick}>
            <span style={{ color: "#FFFFFF", fontWeight: "bold", textAlign: "center" }}>Upload to HealthDrive</span>
          </div>
        );
    }
  };

  return (
    <div style={{ background: "#FFF", padding: "20px", borderRadius: "25px" }}>
      <HealthDriveQrCode uuid={uuid} testType={testType} />
      {fhirRecord ? controlElement() : null}
    </div>
  );
};

UploadToHealthDrive.propTypes = {
  uuid: PropTypes.string.isRequired,
  fhirRecord: PropTypes.shape(),
  testType: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
};

UploadToHealthDrive.defaultProps = {
  fhirRecord: undefined,
};

export default UploadToHealthDrive;