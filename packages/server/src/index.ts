import express, { Request, Response } from 'express';
import cors from "cors";
import fs from "fs";

import routes from "./routes";

const PORT = process.env.PORT || 3333

const app = express();

app.use(cors());
app.use(routes);

app.get("/images/:id", function (req: Request, res: Response) {
  const { id } = req.params

  const file = `../../public/uploads/${id}`;

  const type = "image/jpeg";
  const s = fs.createReadStream(file)

  s.on("open", function () {
    res.status(200);
    res.set("Content-Type", type)
    s.pipe(res)
  });
  s.on("error", function () {
    res.set("Content-Type", "text/plain");
    res.status(404).end("Not found");
  })
});

app.listen(PORT, () => {
  console.log(`BACKEND is running on port ${PORT}`)
});
