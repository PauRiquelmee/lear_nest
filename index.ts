import express, { Application, Request, Response } from 'express';
import connectToDB from './src/db/conection';
import * as api from './src/routes/indexo';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT!;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

api.createRoutes(app);

app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
});

connectToDB().then((connected: boolean) => {
  if (connected) {
    app.listen(PORT, () => {
      console.log('run on ' + PORT);
    });
  } else {
    console.log('Error mongo db connection');
  }
});
