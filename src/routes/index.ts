import express from 'express';
import images from './api/images';

const routers = express.Router();

routers.get('/', (req, res) => {
  res.send(
    'Welcome to Project 1 of Udacity. Please add /images to path of url resize a image '
  );
});

routers.use('/images', images);

export default routers;
