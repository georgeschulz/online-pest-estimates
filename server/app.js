require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./model/db');

app.get("/", async (req, res) => {

})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})