const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const config = require('../config');

exports.upload = function(req, res, next) {
    if(req.accessLevel < 1) {
        res.status(401);
        res.send("Access Denied");
        return false;
    }

    if(!req.files) {
        console.log("No files found");
    }

    let file = req.files.file;

    let myBucket = 'dhartportfolio';
    let myKey = 'images/' + file.md5 + file.name.substr(file.name.lastIndexOf('.'));


    params = {Bucket: myBucket, Key: myKey, Body: file.data};

    s3.upload(params, function(err, data) {

        if (err) {

            console.log(err);
            res.status(500);
            res.send("Upload Failed");

        } else {
            res.status(201);
            console.log("Successfully uploaded data to " + myBucket);
            res.send({
                Location: config.awsRoot + myKey
            });

        }

    });

}