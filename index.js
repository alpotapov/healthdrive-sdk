const qrcode = require('qrcode');
const { Readable } = require('stream');

function generateQRCode(data) {
  return new Promise((resolve, reject) => {
    qrcode.toFileStream(data, { type: 'png' }, (err, stream) => {
      if (err) {reject(err)}
      else {resolve(stream)}
    });
  });
}

function displayImage(imageStream, imgRef) {
  if (!(imageStream instanceof Readable)) {
    throw new Error('imageStream is not a readable stream');
  }
  if (!imgRef || !(imgRef instanceof HTMLImageElement)) {
    throw new Error('imgRef is not a reference to an HTMLImageElement');
  }

  const streamUrl = URL.createObjectURL(imageStream);

  imgRef.src = streamUrl;
}


module.exports = { generateQRCode, displayImage };