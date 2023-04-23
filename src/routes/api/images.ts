import express from 'express';
import path from 'path';
const images = express.Router();
import resizeImage from '../../middleware/images-middleware';

images.get('/', async (req, res) => {
  const fileName: string = req.query.fileName as string;
  const width = req.query.width as unknown as number;
  const height = req.query.height as unknown as number;
  const resizedImage = await resizeImage.resizeFile(fileName, width, height);
  const responseImage: string = resizedImage.path as string;
  res.sendFile(responseImage);
});
export default images;
