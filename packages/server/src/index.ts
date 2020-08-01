import express from 'express';
import cors from 'cors';

const PORT = 3333;

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`BACKEND is running on port ${PORT}`);
})