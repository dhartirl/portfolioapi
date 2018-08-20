const PortfolioItem = require('../models/portfolio-item.model');

exports.create = function (req, res, next) {
    if(req.accessLevel < 1) {
        res.send({ "success": false, error: "You do not have access to create posts" });
        return false;
    }
    let item = new PortfolioItem({
        name: req.body.name,
        url: req.body.url,
        image: req.body.image,
        description: req.body.description,
        writeup: req.body.writeup
    });

    item.save(function (err, detail) {
        if (err) {
            return next(err);
        }
        res.send(detail);
    });
};

exports.item_details = function(req, res, next) {
    PortfolioItem.findById(req.params.id, function(err, item) {
        if(err) return next(err);
        res.send(item);
    });
};

exports.update = function(req, res, next) {
    if(req.accessLevel < 1) {
        res.send({ "success": false, error: "You do not have access to modify this post" });
        return false;
    }
    PortfolioItem.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, item) {
        if(err) return next(err);
        res.send(item);
    });
};

exports.delete = function(req, res, next) {
    if(req.accessLevel < 1) {
        res.send({ "success": false, error: "You do not have access to delete this post" });
        return false;
    }
    PortfolioItem.findByIdAndRemove(req.params.id, function(err) {
        if(err) return next(err);
        res.send({ 'success': true });
    });
};

exports.list = function(req, res, next) {
    PortfolioItem.find({}, function(err, items) {
        if(err) return next(err);
        res.send(items);
    });
};