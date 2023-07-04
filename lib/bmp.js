import {
  createFileHeader,
  createFileInfoHeader,
  calculatePaddingSize,
} from './common/bmp.js';
import { bytesPerSegment } from './common/constants/bytes.js';

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

export { getFullBmp };
