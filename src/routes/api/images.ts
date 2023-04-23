import express, { NextFunction } from 'express';
import path from 'path';
const images = express.Router();
import resizeImage from '../../middleware/images-middleware';
const imagePath = path.resolve('./src/assets');

images.get('/', async (req, res, next: NextFunction) => {
  const fileName = req.query.fileName;
  console.log(imagePath)
  const filePath_Full = path.resolve(`${imagePath}/full/${fileName}.png`);
  //check if user dont put the width or height we will get default value
  const width = req.query.width ? req.query.width : 300;
  const height = req.query.height ? req.query.height : 300;
  if (!fileName) {
    next('Please intput the fileName or fileName is incorrect');
  } else if (!resizeImage.checkFileExist(filePath_Full)) {
    next('The file you send is not exist please input another one');
  } else if (isNaN(Number(width)) || isNaN(Number(height))) {
    // check if user input inccorect type
    next('Please input width or height of the image as a number');
  } else if (Number(width) <= 0 || Number(height) <= 0) {
    next('Please input a positive number for width or height');
  } else if (fileName && !isNaN(Number(width)) && !isNaN(Number(height))) {
    const resizedImage = await resizeImage.resizeFile(
      fileName as string,
      width as number,
      height as number
    );
    res.sendFile(resizedImage);
  }
});
export default images;
