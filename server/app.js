require('./../config/config');
const express = require('express');
const routes = require('./routes/');
const mongoose = require('./db/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cloudinary = require('cloudinary');

const app = express();
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
// app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server started at port: ${process.env.PORT}`);
});