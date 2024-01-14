// Packages
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import helmet from 'helmet';

// Project
import appRouter from './routes';
import database from './db';

const app = express()

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
app.use(helmet())
app.use(express.json())
app.use(bodyParser.json({ type: 'application/*+json' }))

database.authenticate()
  .then(() => {
    console.log("Database connected.");
  })
  .catch(err => {
    console.error("Database connection failed: ", err);
  });
  
app.use('/api', appRouter);

export default app;