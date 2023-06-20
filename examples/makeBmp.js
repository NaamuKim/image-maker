const { getFullBmp } = require('../lib');
const fs = require('fs');

const redBlock = Buffer.from([0, 0, 255]);
const greenBlock = Buffer.from([0, 255, 0]);
const blueBlock = Buffer.from([255, 0, 0]);

const redBlueBlock = Buffer.concat([redBlock, redBlock, blueBlock, blueBlock]);

const myBmp = getFullBmp({ colorsData: redBlueBlock, width: 2, height: 2 });

fs.writeFile('test.bmp', myBmp, (err) => {
  if (err) throw err;
  console.log('"test.bmp" file created.');
});
