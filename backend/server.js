require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const PORT = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

const candidateRoute = require('./Routes/candidateRoute');
app.use('/candidate', candidateRoute);

app.listen(PORT, () => {
    console.log(`App is litning on the portt : ${PORT}`);
});