/**
 * @package: .\
 * @description: main js file for backend
 * 
 * @author: Shashank Jha <shshankj677@gmail.com>
 */

// package import
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models');

const app = express();

db.sequelize.sync().then(() => { console.log("Connected to DB") }).catch((err) => {console.log(err)});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

require('./routes/user.routes')(app);

app.listen(5000);
