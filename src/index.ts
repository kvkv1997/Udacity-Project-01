import express from 'express';
import routers from './routes';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Please put more /api to get more info');
});

app.use('/api', routers);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
