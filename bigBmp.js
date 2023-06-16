const fs = require('fs');
const { createFileInfoHeader } = require('./common/bmp');

// Set the target image width and height
const targetWidth = 2;
const targetHeight = 2;

// Generate binary data representing red (RGB values: 255, 0, 0)
const red = Buffer.from([0, 0, 255]);

// Write the header and red data to the image file
const writeImage = () => {
  const fileHeader = createFileHeader();
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

// Create file header
const createFileHeader = () => {
  const fileSize = 54 + red.length * targetWidth * targetHeight; // 54 bytes is the size of the header
  const fileHeader = Buffer.alloc(14);
  fileHeader.write('BM', 0); // File type
  fileHeader.writeInt32LE(fileSize, 2); // File size
  fileHeader.writeInt32LE(0, 6); // Reserved (0)
  fileHeader.writeInt32LE(54, 10); // Start offset of pixel data
  return fileHeader;
};

// Create image data
const createImageData = () => {
  const imageDataSize = red.length * targetWidth * targetHeight;
  const paddingSize = calculatePaddingSize(targetWidth, red.length);
  const imageData = Buffer.alloc(imageDataSize + paddingSize);

  // Enlarge the pixel to the target image size
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
const calculatePaddingSize = (width, pixelSize) => {
  const bytesPerRow = width * pixelSize;
  return (4 - (bytesPerRow % 4)) % 4;
};

writeImage();
