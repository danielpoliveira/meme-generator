import express from "express";
import cors from 'cors';

import fs from 'fs';

import routes from './routes';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(routes)

app.get('/images/:id', function (req, res) {
  const { id } = req.params;
  
  var file = `../../public/uploads/${id}`
  
  var type = 'image/jpeg';
  var s = fs.createReadStream(file);

  //console.log(s)
  s.on('open', function () {
    res.status(200)
    res.set('Content-Type', type);
    s.pipe(res);
  });
  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
  });
});

app.listen(PORT, () => {
  console.log(`BACKEND is running on port ${PORT}`);
})