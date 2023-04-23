import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
const imagePath = path.resolve('./src/assets');

const checkFileExist = (fileName: string) => {
  return fs.existsSync(fileName);
};

const resizeFile = async (fileName: string, width: number, height: number) => {
  const widthAsNumber: number = +width;
  const heightAsNumber: number = +height;
  const filePath_Full = path.resolve(`${imagePath}/full/${fileName}.png`);
  const filePath_Thumb = path.resolve(`${imagePath}/thumb/${fileName}.png`);
  if (checkFileExist(filePath_Thumb)) {
    fs.unlinkSync(filePath_Thumb);
  }
  await sharp(filePath_Full)
    .resize(widthAsNumber, heightAsNumber)
    .toFile(filePath_Thumb);

  const fileStream = fs.createReadStream(filePath_Thumb);
  return fileStream.path as string;
};
// Function to get the size of an image file
async function getImageSize(
  filePath: string
): Promise<{ width: number; height: number }> {
  const metadata = await sharp(filePath).metadata();
  return { width: metadata.width!, height: metadata.height! };
}

// Example usage
async function compareImageSizes(
  filePath1: string,
  filePath2: string
): Promise<number> {
  const size1 = await getImageSize(filePath1);
  const size2 = await getImageSize(filePath2);
  const size1Area = size1.width * size1.height;
  const size2Area = size2.width * size2.height;
  if (size1Area < size2Area) {
    return -1;
  } else if (size1Area > size2Area) {
    return 1;
  } else {
    return 0;
  }
}

export default { resizeFile, compareImageSizes, checkFileExist };
