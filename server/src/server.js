require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mainRouter } = require('./routers/index');
const mongoose = require('mongoose');
const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!!!");
});

app.use("/api/v1", mainRouter);
const PORT = 3001;



const uri = "mongodb+srv://mrayendi1:ciA7C9znZpI2ynry@cluster0.i1s4gt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log("Successfully connected to MongoDB using Mongoose!");
})
.catch(err => {
  console.error("Connection error", err);
});



const start =  () => {
  try {
    console.log("Connecting to database...");
    server.listen(PORT, () => {
        console.log(`App is running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
