const express = require('express')
const app = express();
require ('dotenv').config();

app.listen(3000, () => 
console.log("Starting Server: http://localhost:3000"));

app.use(express.static("public"));


