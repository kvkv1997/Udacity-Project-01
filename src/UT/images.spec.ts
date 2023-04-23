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
describe('Image should be resize', () => {
    //size of image in full folder is 360x360
    const fileName = 'thank-you';
    const filePath_Full = path.resolve(`${imagePath}/full/${fileName}.png`);
    const filePath_Thumb = path.resolve(`${imagePath}/thumb/${fileName}.png`);
    it('image created sould be  smaller', async () => {
        const response = await request.get(
            '/api/images?fileName=thank-you&width=300&height=300'
        );
        const comparisonResult = await imageMiddleware.compareImageSizes(
            filePath_Full,
            filePath_Thumb
        );
        expect(response.statusCode).toBe(200);
        expect(comparisonResult).toEqual(1);
    });
    it('image created sould be larger', async () => {
        const response = await request.get(
            '/api/images?fileName=thank-you&width=300&height=500'
        );
        const comparisonResult = await imageMiddleware.compareImageSizes(
            filePath_Full,
            filePath_Thumb
        );
        expect(response.statusCode).toBe(200);
        expect(comparisonResult).toEqual(-1);
    });
    it('image created sould be equal', async () => {
        const response = await request.get(
            '/api/images?fileName=thank-you&width=360&height=360'
        );
        const comparisonResult = await imageMiddleware.compareImageSizes(
            filePath_Full,
            filePath_Thumb
        );
        expect(response.statusCode).toBe(200);
        expect(comparisonResult).toEqual(0);
    });
});
