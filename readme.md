# image-maker

Making or manufacturing image

## Installation

This module is installed via npm:

``` sh
npm install image-maker
```

## Usage

#### Node.js

make bmp file with color data

```js
const { getFullBmp } = require('image-maker');
const fs = require('fs');

const redBlock = Buffer.from([0, 0, 255]);
const blueBlock = Buffer.from([255, 0, 0]);

const redBlueBlock = Buffer.concat([redBlock, redBlock, blueBlock, blueBlock]);

const myBmp = getFullBmp({ colorsData: redBlueBlock, width: 2, height: 2 });

fs.writeFile('red_blue.bmp', myBmp, (err) => {
  if (err) throw err;
  console.log('"test.bmp" file created.');
});
```