var express             =   require('express');
var passport            =   require('passport')
var GoogleStrategy      =   require('passport-google-oauth').OAuth2Strategy;
var User                =   require('../models/user');
var Board               =   require('../models/board');
var List                =   require('../models/boardlist');
var configAuth          =   require('./auth');
var app = express();

var Passport = {
    setup: function() {
        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            User.findOne({id: id}, function(err, user) {
                done(err, user);
            });
        });
        
        // =========================================================================
        // GOOGLE ==================================================================
        // =========================================================================
        passport.use(new GoogleStrategy({

            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,

        },
        function(token, refreshToken, profile, done) {
            console.log("TOKEN AND REFRESH");
            console.log(token);
            console.log(refreshToken);
            process.nextTick(function() {
                // try to find the user based on their google id
                User.findOne({ 'id' : profile.id }, function(err, user) {
                    if (err) return done(err);
                    if (user) {
                        console.log("Found existing");
                        user['token'] = token;
                        // the refresh token only given first time user gives approval
                        // to offline access, so only add to database when is undefined in
                        // user database.
                        if(!user['refreshToken']){
                            user['refreshToken'] = refreshToken;
                        }
                        console.log("here I am if i exist" + refreshToken);
                        user.save(function(err, updatedUser){
                            return done(null, updatedUser);
                        });
                    } else {
                        // if the user is new, then
                        // create a new user, and create default lists
                        profile['token'] = token;
                        profile['refreshToken'] = refreshToken;
                        var newUser = new User(profile);
                        var newBoard = new Board({user: newUser._id});
                        newUser.boards.push(newBoard);
                        newUser.save(function(err,newUser) {
                            if (err) throw err;
                            console.log("Making new Board");
                            if(newUser) {
                                newBoard.save(function(err, newBoard){
                                    if(err) console.log(err);
                                    if(newBoard) {
                                        var lists = [
                                            {name:"Applied",iconName:"applied.png", board:newBoard._id},
                                            {name:"Phone",iconName:"phone.png", board:newBoard._id},
                                            {name:"On Site",iconName:"onsite.png", board:newBoard._id},
                                            {name:"Offer",iconName:"offer.png", board:newBoard._id}
                                        ];

                                        List.collection.insert(lists,function(err,newLists) {
                                            if (err) console.log(err);
                                            console.log("THIS IS THE RESPONSE");
                                            console.log(newLists);
                                            newLists.ops.map(function(list) {
                                                newBoard.lists.push(list);
                                            })
                                            newBoard.save(function(err,newBoard) {
                                                return done(null, newUser);
                                            });
                                        });
                                    };
                                });
                            };
                        });
                    };
                });
            });

        }));
}};

module.exports = Passport;

