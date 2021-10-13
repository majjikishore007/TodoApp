require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 9000;
const DB_URL = process.env.DB_URL;

//middlewares

const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("well done man !");
});

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", todoRoutes);
//Db connection

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("💚 DB IS CONNECTED");
  })
  .catch((err) => {
    console.error(err);
  });

// server startup

app.listen(PORT, () => {
  console.log(`💚 💙 💛 app is  listening on ${PORT}`);
});
