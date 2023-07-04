/*
 *   BMP 파일 포맷
 *   BMP 파일은 파일 헤더와 파일 정보 헤더, 픽셀 데이터로 구성된다.
 */

const createFileHeader = ({ width, height, pixelLength = 3 }) => {
  const fileSize = 54 + width * height * pixelLength; // 54바이트는 헤더 크기
  const fileHeader = Buffer.alloc(14);
  fileHeader.write('BM', 0); // 파일 타입
  fileHeader.writeInt16LE(fileSize, 2); // 파일 크기
  fileHeader.writeInt16LE(54, 10); // 픽셀 데이터의 시작 오프셋
  return fileHeader;
};

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

const calculatePaddingSize = (width, pixelSize = 3) => {
  const bytesPerRow = width * pixelSize;
  return (4 - (bytesPerRow % 4)) % 4;
};

export { createFileHeader, createFileInfoHeader, calculatePaddingSize };
