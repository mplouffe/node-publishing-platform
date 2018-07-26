const User = require('./../models/User');
const Article = require('./../models/Article');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
    addUser: (req, res, next) => {
        new User(req.body).save((err, newUser) => {
            if(err)
                res.send(err);
            else if (!newUser)
                res.sendStatus(400);
            else
                res.send(newUser);
            next();
        });
    },
    getUser: (req, res, next) => {
        User.findById(req.params.id)
            .then((err, user) => {
                if(err)
                    res.send(err);
                else if(!user)
                    res.sendStatus(404);
                else
                    res.send(user);
                next();
            }).catch(e => {
                res.sendStatus(404);
                next();
            });
    },
    followUser: (req, res, next) => {
        User.findById(req.body.id)
            .then((user) => {
                return user.follow(req.body.user_id).then(() => {
                    return res.json({msg: "followed"})
                });
            }).catch(next);
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then((user) => {
            return User.find({'following': rq.params.id}).then((_users) => {
                _users.forEach((user_) => {
                    _user.addFollower(user_);
                });
                return Article.find({'author': req.params.id}).then((_articles) => {
                    return res.json({ user: _user, articles: _articles });
                });
            });
        }).catch((err) => {
            console.log(err);
            res.sendStatus(404);
            next();
        });
    }
}