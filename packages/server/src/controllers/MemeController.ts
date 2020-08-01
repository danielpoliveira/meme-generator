import express from 'express';
import multer from 'multer';

import Meme from '@models/Meme';

const upload = multer({ dest: 'public/uploads' });

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const meme = await Meme.find({ });

    return res.send({ meme });

  } catch (err) {
    return res.status(500).send({ errors: [err] });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const { photo } = req.file;
  const { username } = req.body;

  if (!photo || !username)
    return res.status(400).send({ error: 'error on post images' });

  try {
    const meme = await Meme.create({
      image: photo.filename,
      username,
    });

    return res.send({ meme });
  } catch (err) {
    return res.status(500).send({ errors: [err] });
  }
});

export default router;
