import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
const ORIGIN_LOCALHOST = process.env.ORIGIN_LOCALHOST || '';
const ORIGIN_PRODUCT = process.env.ORIGIN_PRODUCT || '';

const allowedOrigins: string[] = [ORIGIN_LOCALHOST, ORIGIN_PRODUCT];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

routes(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

export default app;
