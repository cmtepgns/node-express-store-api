// require .env
require("dotenv").config();
require('express-async-errors')

// require connection
const connectDB = require("./db/connect");

// routers
const productsRouter = require("./routes/products");

// set up
const express = require("express");
const app = express();
const port = 3000;

// not found require
const notFound = require("./middleware/not-found");

// json body
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products page</a>');
});

app.use("/api/v1/products", productsRouter);

// products route
app.get("/api/v1/products", (req, res) => {
  res.send("products page");
});

// no defined routes
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
