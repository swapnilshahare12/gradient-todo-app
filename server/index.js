require("dotenv").config();
const express = require("express");
const app = express();
require("./db/connection");
const todoRoute = require("./routes/todoroute");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/todo", todoRoute);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(3000, () => console.log("server is running on port 3000"));
