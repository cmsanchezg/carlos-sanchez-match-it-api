const express = require("express");
const app = express();
const cors = require("cors");
const router = require('./routes/images');
require("dotenv").config();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use("/categories", express.static("public/categories"));

app.use ('/', router)

app.listen(PORT, () => {
    console.log("app is running on port " + PORT)
});