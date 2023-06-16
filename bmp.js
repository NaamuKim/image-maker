const fs = require('fs');

// 이미지 너비와 높이 설정
const width = 1;
const height = 1;

// 빨간색(RGB 값 255, 0, 0)을 나타내는 이진 데이터 생성
// bmp는 rgb가 반대이다.
const red = Buffer.from([0, 0, 255]);

// 이미지 파일에 헤더와 빨간색 데이터를 씁니다.
const writeImage = () => {
    const fileHeader = createFileHeader();
    const fileInfoHeader = createFileInfoHeader();
    const imageData = createImageData();
    const fileData = Buffer.concat([fileHeader, fileInfoHeader, imageData]);

    fs.writeFile('red_image.bmp', fileData, (err) => {
        if (err) throw err;
        console.log('이미지가 생성되었습니다. "red_image.bmp" 파일을 확인해보세요.');
    });
};

// 파일 헤더 생성
const createFileHeader = () => {
    const fileSize = 54 + red.length; // 54바이트는 헤더 크기
    const fileHeader = Buffer.alloc(14);
    fileHeader.write('BM', 0); // 파일 타입
    fileHeader.writeInt16LE(fileSize, 2); // 파일 크기
    fileHeader.writeInt16LE(54, 10); // 픽셀 데이터의 시작 오프셋
    return fileHeader;
};

// 파일 정보 헤더 생성
const createFileInfoHeader = () => {
    const fileInfoHeader = Buffer.alloc(40);
    fileInfoHeader.writeInt32LE(40, 0); // 파일 정보 헤더 크기
    fileInfoHeader.writeInt32LE(width, 4); // 이미지 너비
    fileInfoHeader.writeInt32LE(height, 8); // 이미지 높이
    fileInfoHeader.writeInt16LE(1, 12); // 계층 수
    fileInfoHeader.writeInt16LE(24, 14); // 비트 수 (24비트 = 3바이트)
    fileInfoHeader.writeInt32LE(0, 16); // 압축 방식 (압축 없음)

    const imageDataSize = width * height * 3; // 이미지 데이터 크기 계산 (너비 x 높이 x 비트 수/8)
    fileInfoHeader.writeInt32LE(imageDataSize, 20); // 픽셀 데이터 크기

    return fileInfoHeader;
};

// 이미지 데이터 생성
const createImageData = () => {
    const imageData = Buffer.alloc(red.length);
    red.copy(imageData); // 빨간색 데이터 복사
    return imageData;
};

writeImage();
