import express, { Request, Response } from 'express';
import multer from 'multer';

import Meme from '@models/Meme';

let upload = multer({ dest: '../../public/uploads/' });

const router = express.Router();

interface MulterRequest extends Request {
  body: any;
  file: any;
}

router.get('/memes', async (req: Request, res: Response) => {
  try {
    const meme = await Meme.find({}).sort({ createdAt: -1 });

    return res.send({ meme });

  } catch (err) {
    return res.status(500).send({ errors: [err] });
  }
});

router.post('/meme', upload.single('image'),
  async (req: MulterRequest, res: Response) => {
    const image = req.file;
    const { username } = req.body;

    console.log('arquivo de imagem: ', req.file);
    console.log('username -> ', username);

    if (!image || !username)
      return res.status(400).send({ error: 'error on post images' });

    try {
      const meme = await Meme.create({
        image: image.filename,
        username,
      });

      return res.send({ meme });
    } catch (err) {
      return res.status(500).send({ errors: [err] });
    }

  }
);

export default router;
