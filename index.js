require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.port || 3000;



app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "ejs");


const db = process.env.connectionstring
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use('/', require("./Routes/login"));
app.use('/dashboard', require("./Routes/dashboard"));

app.listen(port, () => console.log(`server is running at the port ${port}`));
