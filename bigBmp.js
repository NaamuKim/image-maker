const fs = require('fs');
const {
  createFileInfoHeader,
  createFileHeader,
  calculatePaddingSize,
} = require('./common/bmp');

// Set the target image width and height
const targetWidth = 2;
const targetHeight = 2;

// Generate binary data representing red (RGB values: 255, 0, 0)
const red = Buffer.from([0, 0, 255]);

// Write the header and red data to the image file
const writeImage = () => {
  const fileHeader = createFileHeader({
    width: targetWidth,
    height: targetHeight,
  });
  const fileInfoHeader = createFileInfoHeader({
    width: targetWidth,
    height: targetHeight,
  });
  const imageData = createImageData();
  const fileData = Buffer.concat([fileHeader, fileInfoHeader, imageData]);

  fs.writeFile('enlarged_image.bmp', fileData, (err) => {
    if (err) throw err;
    console.log(
      'The image has been created. Check the "enlarged_image.bmp" file.'
    );
  });
};

// Create image data
const createImageData = () => {
  const imageDataSize = red.length * targetWidth * targetHeight;
  const paddingSize = calculatePaddingSize(targetWidth, red.length);
  const imageData = Buffer.alloc(imageDataSize + paddingSize);

  let offset = 0;
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      red.copy(imageData, offset);
      offset += red.length;
    }
    offset += paddingSize;
  }

  return imageData;
};

// Calculate the number of bytes required for padding

writeImage();
