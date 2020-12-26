require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
let cors = require('cors');
const path = require('path');
const busboy = require('busboy');
const fileUpload = require('express-fileupload');


// const file

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
const userRouter = require('./api/users/user.router');
const classRouter = require('./api/classroom/classroom.router');
app.use('/api/users', userRouter);
app.use('/api', classRouter);


app.listen(process.env.APP_PORT, () => {
    console.log('Listening on port :', process.env.APP_PORT);
})