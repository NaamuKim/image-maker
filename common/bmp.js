const createFileInfoHeader = ({ width, height, pixelLength = 3 }) => {
  const fileInfoHeader = Buffer.alloc(40);
  fileInfoHeader.writeInt32LE(40, 0); // File information header size
  fileInfoHeader.writeInt32LE(width, 4); // Image width
  fileInfoHeader.writeInt32LE(height, 8); // Image height
  fileInfoHeader.writeInt16LE(1, 12); // Number of color planes
  fileInfoHeader.writeInt16LE(24, 14); // Number of bits per pixel
  fileInfoHeader.writeInt32LE(0, 16); // Compression method (no compression)
  fileInfoHeader.writeInt32LE(pixelLength * width * height, 20); // Image data size
  return fileInfoHeader;
};

module.exports = {
  createFileInfoHeader,
};
