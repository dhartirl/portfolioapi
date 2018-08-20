const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');

const portfolioRoute = require('./routes/portfolio-item.route');
const userRoute = require('./routes/user.route');
const jobRoute = require('./routes/jobs.route');
const fileRoute = require('./routes/file.route');
const app = express();

const mongoose = require('mongoose');
const UserModel = require('./models/user.model');

let mongoDB = config.dbUrl;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Connection Error'));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', config.clientLocation);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', false);

    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Attach user access level to request
app.use(function(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token)  {
        req.accessLevel = 0;
        next();
        return;
    }
    jwt.verify(token, config.authSecret, (err, plain) => {
        if(err) {
            req.accessLevel = 0;
            next();
            return;
        }
        UserModel.findById(plain.id, (dbErr, obj) => {
            if(dbErr) {
                console.log(dbErr);
                req.accessLevel = 0;
                next();
                return;
            }
            req.accessLevel = obj.accessLevel;
            next();
        });
    });
});

app.use(fileUpload());

app.use('/portfolio', portfolioRoute);
app.use('/user', userRoute);
app.use('/jobs', jobRoute);
app.use('/file', fileRoute);



var port = config.listenPort;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});