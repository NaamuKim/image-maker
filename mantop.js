const fs = require('fs');

// Read the image file
fs.readFile('./enlarged_image.bmp', (err, data) => {
    if (err) throw err;

    const bytesPerPixel = 3; // Each pixel has 3 bytes (RGB)
    const targetRow = 1; // Target row to modify (0-based index)
    const targetColumnStart = 0; // Target column start position (0-based index)
    const targetColumnEnd = 1; // Target column end position (0-based index)

    const imageWidth = data.readInt32LE(18); // Read the image width from the file header
    const bytesPerRow = calculateBytesPerRow(imageWidth, bytesPerPixel); // Calculate the number of bytes per row

    // Calculate the byte offset of the target position
    const byteOffset = 54 + (bytesPerRow * targetRow) + (targetColumnStart * bytesPerPixel);


    // Modify the pixel color to blue (RGB values: 0, 0, 255)
    for (let i = targetColumnStart; i <= targetColumnEnd; i++) {
        const pixelOffset = byteOffset + (i * bytesPerPixel);
        data.writeUInt8(255, pixelOffset); // Red component
        data.writeUInt8(0, pixelOffset + 1); // Green component
        data.writeUInt8(0, pixelOffset + 2); // Blue component
    }


    // Write the modified data back to the image file
    fs.writeFile('modified_image.bmp', data, (err) => {
        if (err) throw err;
        console.log('The image has been modified. Check the "modified_image.bmp" file.');
    });
});

// Calculate the number of bytes per row (taking into account the padding)
const calculateBytesPerRow = (width, bytesPerPixel) => {
    const bytesPerRow = width * bytesPerPixel;
    const paddingSize = (4 - (bytesPerRow % 4)) % 4;
    return bytesPerRow + paddingSize;
};
