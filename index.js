/**
 * @package: .\
 * @description: main js file for backend
 * 
 * @author: Shashank Jha <shshankj677@gmail.com>
 */

// package import
const express = require('express');
const db = require('./model');

const app = express();

db.sequelize.sync({force: true}).then(() => { console.log("Connected to DB") }).catch((err) => {console.log(err)});

app.listen(5000);

app.get('/', (req, res) => {
    res.send('Hello! world');
});
