require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { mainRouter } = require('./routers/index');


const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!!!");
});

app.use("/api/v1", mainRouter);
const PORT = 3000;

const start = async () => {
  try {
    console.log("Connecting to database...");
    // await connectDB(config.NODE_ENV === "development" ? config.DATABASE_URL : config.DATABASE_URL);
    server.listen(PORT, () => {
        console.log(`App is running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

console.log(process.env.DATABASE_URL);

start();
