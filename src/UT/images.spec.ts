import supertest from 'supertest';
import app from '../index';
import path from 'path';
import imageMiddleware from '../middleware/images-middleware';
import fs from 'fs';
const request = supertest(app);
const imagePath = path.resolve('./src/assets');
describe('Test /images endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/images?fileName=thank-you&width=300&height=500'
    );
    expect(response.statusCode).toBe(200);
  });
  it('Test resize function that create new image', async () => {
    const cacheFile = path.resolve(`${imagePath}/thumb/thank-you-300-500.png`);
    const isExist: boolean = imageMiddleware.checkFileExist(cacheFile);
    if (isExist) {
      fs.unlinkSync(cacheFile);
    }
    const newWidth = 300;
    const newHeight = 700;
    const resizedImage = await imageMiddleware.resizeFile(
      'thank-you' as string,
      newWidth as number,
      newHeight as number
    );
    const newFilePath = path.resolve(
      `${imagePath}/thumb/thank-you-${newWidth}-${newHeight}.png`
    );
    expect(imageMiddleware.checkFileExist(newFilePath)).toBeTrue();
  });
});
