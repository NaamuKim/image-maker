const {
  createFileHeader,
  createFileInfoHeader,
  calculatePaddingSize,
} = require('./common/bmp');
const { bytesPerSegment } = require('./common/constants/bytes');
const fs = require('fs');

const getFullBmp = ({ colorsData, width, height }) => {
  const fileHeader = createFileHeader({ width, height });
  const fileInfoHeader = createFileInfoHeader({ width, height });
  const paddingSize = calculatePaddingSize(width);
  const imageData = Buffer.alloc(colorsData.length + paddingSize);

  let offset = 0;
  let sliceOffset = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const segment = colorsData.slice(
        sliceOffset,
        sliceOffset + bytesPerSegment
      );
      segment.copy(imageData, offset);
      offset += segment.length;
      sliceOffset += segment.length;
    }
    offset += paddingSize;
  }
  return Buffer.concat([fileHeader, fileInfoHeader, imageData]);
};

const redBlock = Buffer.from([0, 0, 255]);
const greenBlock = Buffer.from([0, 255, 0]);
const blueBlock = Buffer.from([255, 0, 0]);

const redBlueBlock = Buffer.concat([redBlock, redBlock, blueBlock, blueBlock]);

const myBmp = getFullBmp({ colorsData: redBlueBlock, width: 2, height: 2 });

fs.writeFile('test.bmp', myBmp, (err) => {
  if (err) throw err;
  console.log('이미지가 생성되었습니다. "test.bmp" 파일을 확인해보세요.');
});

module.exports = {
  getFullBmp,
};
