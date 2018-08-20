const Job = require('../models/job.model');

exports.create = function (req, res, next) {
    if(req.accessLevel < 1) {
        res.send({ "success": false, error: "You do not have access to create posts" });
        return false;
    }
    let item = new Job({
        title: req.body.title,
        employer: req.body.employer,
        address: req.body.address,
        dates: req.body.dates,
        bullets: req.body.bullets
    });

    item.save(function (err, detail) {
        if (err) {
            return next(err);
        }
        res.send(detail);
    });
};

exports.item_details = function(req, res, next) {
    Job.findById(req.params.id, function(err, item) {
        if(err) return next(err);
        res.send(item);
    });
};

exports.update = function(req, res, next) {
    if(req.accessLevel < 1) {
        res.send({ "success": false, error: "You do not have access to modify this post" });
        return false;
    }
    Job.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, item) {
        if(err) return next(err);
        res.send(item);
    });
};

exports.delete = function(req, res, next) {
    if(req.accessLevel < 1) {
        res.send({ "success": false, error: "You do not have access to delete this post" });
        return false;
    }
    Job.findByIdAndRemove(req.params.id, function(err) {
        if(err) return next(err);
        res.send({ 'success': true });
    });
};

exports.list = function(req, res, next) {
    Job.find({}, function(err, items) {
        if(err) return next(err);
        res.send(items);
    });
};