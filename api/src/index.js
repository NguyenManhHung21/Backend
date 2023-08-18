const express = require("express");
const app = express();
app.use(express.json());
const db = require("./app/config/db");
const route = require("./app/routes");
const cors = require("cors");

app.use(cors());

//Connect to DB
db.connect();

route(app);

app.listen(3000);
