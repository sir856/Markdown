const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('../config');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


app.use(require('./routes/requests'));

mongoose.connect(config.dbURL, config.dbOptions);
mongoose.connection
    .once('open', () => {
        console.log(`Mongoose - successful connection ...`);
        app.listen(config.port, () => console.log(`Server start on port ${config.port} ...`));
    })
    .on('error', error => console.warn(error));