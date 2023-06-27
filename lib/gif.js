const fs = require('fs');
// const createGifHeader = () => {
//   const gifHeader = Buffer.from([
//     // Header
//     0x47,
//     0x49,
//     0x46,
//     0x38,
//     0x39,
//     0x61, // "GIF89a"
//     // Logical Screen Descriptor
//     0x01,
//     0x00, // Width: 1
//     0x01,
//     0x00, // Height: 1
//     0x80, // Packed field: Global color table flag (1), Color resolution (001), Sort flag (0), Size of global color table (000)
//     0x00, // Background color index
//     0x00, // Pixel aspect ratio
//   ]);
// };

const gif = Buffer.from([
  // Header
  0x47,
  0x49,
  0x46,
  0x38,
  0x39,
  0x61, // "GIF89a"
  // Logical Screen Descriptor
  0x01,
  0x00, // Width: 1
  0x01,
  0x00, // Height: 1
  0x80, // Packed field: Global color table flag (1), Color resolution (001), Sort flag (0), Size of global color table (000)
  0x00, // Background color index
  0x00, // Pixel aspect ratio
  // Global Color Table
  0xff,
  0xff,
  0xff, // White
  0x00,
  0x00,
  0x00, // Black
  // Image Descriptor
  0x2c, // Image separator
  0x00,
  0x00, // Left position: 0
  0x00,
  0x00, // Top position: 0
  0x01,
  0x00, // Width: 1
  0x01,
  0x00, // Height: 1
  0x00, // Packed field: Local color table flag (0), Interlace flag (0), Sort flag (0), Reserved (00), Size of local color table (000)
  // Image Data
  0x02, // LZW Minimum Code Size
  0x02, // Size of Data
  0x44,
  0x01, // Image data
  0x00, // Block Terminator
  // GIF Trailer
  0x3b, // GIF file terminator
]);

fs.writeFileSync('one_pixel_white.gif', gif);
