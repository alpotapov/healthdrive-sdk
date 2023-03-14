/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import PropTypes from 'prop-types';
// import QRCode from 'react-qr-code';
import { QRCode } from 'react-qrcode-logo';

import QRCodeLogo from '../assets/QRLogo.png';

const eyeRadius = [
  {
    outer: [8, 8, 8, 8],
    inner: [8, 8, 8, 8],
  },
  {
    outer: [8, 8, 8, 8],
    inner: [8, 8, 8, 8],
  },
  {
    outer: [8, 8, 8, 8],
    inner: [8, 8, 8, 8],
  },
];


const HealthDriveQrCode = ({ uuid, testType }) => {
  const [qrCodeValue, setQrCodeValue] = React.useState('{}');
  React.useEffect(
    () => {
      const qrCodeValue = JSON.stringify({
        uuid,
        testType,
      });
      setQrCodeValue(qrCodeValue);
    }, [uuid, testType]);
  return (
    <QRCode
      logoImage={QRCodeLogo}
      value={qrCodeValue}
      // style={{ background: 'white', padding: '16px', width: "150px", height: "150px" }}
      removeQrCodeBehindLogo={true}
      logoWidth={36}
      logoHeight={36}
      size={150}
      eyeRadius={eyeRadius}
      quietZone={0}
    />
  );
};

HealthDriveQrCode.propTypes = {
  uuid: PropTypes.string.isRequired,
  testType: PropTypes.string.isRequired,
};

export default HealthDriveQrCode;