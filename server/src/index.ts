import dontenv, { configDotenv } from "dotenv";
import express from "express";

configDotenv({
    path: '../.env'
})

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`Server is runnning on port ${process.env.PORT}`)
);
