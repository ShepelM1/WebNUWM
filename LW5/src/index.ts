import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Привіт, мій друже!');
});

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
