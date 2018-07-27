const User = require('./../models/User');
const Article = require('./../models/Article');


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
            .then((err, user) => {
                if(err)
                    res.send(err);
                else if(!user)
                    res.sendStatus(404);
                else {
                    return user.follow(req.body.user_id).then(() => {
                        return res.json({msg: "followed"});
                    });
                }
            }).catch(e => {
                res.sendStatus(404);
                next();
            });
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then((user) => {
            return User.find({'following': req.params.id}).then((_users) => {
                _users.forEach((user_) => {
                    user.addFollower(user_);
                });
                return Article.find({'author': req.params.id}).then((_articles) => {
                    return res.json({ user: user, articles: _articles });
                });
            });
        }).catch((err) => {
            res.sendStatus(404);
            next();
        });
    }
}