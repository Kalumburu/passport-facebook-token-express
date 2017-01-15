var express = require('express')
var app = express()
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookTokenStrategy({
    clientID: "",
    clientSecret: ""
  }, function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({facebookId: profile.id}, function (error, user) {
    //  return done(error, user);
    //});
    console.log(profile);
    return done(profile.provider);
  }
));

app.get('/auth/facebook/token',
  passport.authenticate('facebook-token'),
  function (req, res) {
    // do something with req.user
    res.send(req.user? 200 : 401);
  }
);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
