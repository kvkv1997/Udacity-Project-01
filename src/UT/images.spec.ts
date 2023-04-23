import supertest from 'supertest';
import app from '../index';
import path from 'path';
import imageMiddleware from '../middleware/images-middleware';
const request = supertest(app);
const imagePath = path.resolve('./src/assets');
describe('Test /images endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/images?fileName=thank-you&width=300&height=300'
    );
    expect(response.statusCode).toBe(200);
  });
});
