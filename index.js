require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.port || 3000;
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", require("./routes/login"));
app.get("/register", require("./routes/register"));
app.get("/forgot", require("./routes/forgot"));
app.get("/dasboard", require("./routes/dashboard"));

app.listen(port, () => console.log(`server is running at the port ${port}`));
