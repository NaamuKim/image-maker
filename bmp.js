const fs = require('fs');
const { createFileInfoHeader, createFileHeader } = require('./common/bmp');

// 이미지 너비와 높이 설정
const width = 1;
const height = 1;

// 빨간색(RGB 값 255, 0, 0)을 나타내는 이진 데이터 생성
// bmp는 rgb가 반대이다.
const red = Buffer.from([0, 0, 255]);

// 이미지 파일에 헤더와 빨간색 데이터를 씁니다.
const writeImage = () => {
  const fileHeader = createFileHeader({ width, height });
  const fileInfoHeader = createFileInfoHeader({ width, height });
  const imageData = createImageData();
  const fileData = Buffer.concat([fileHeader, fileInfoHeader, imageData]);

  fs.writeFile('red_image.bmp', fileData, (err) => {
    if (err) throw err;
    console.log(
      '이미지가 생성되었습니다. "red_image.bmp" 파일을 확인해보세요.'
    );
  });
};

// 이미지 데이터 생성
const createImageData = () => {
  const imageData = Buffer.alloc(red.length);
  red.copy(imageData); // 빨간색 데이터 복사
  return imageData;
};

writeImage();
