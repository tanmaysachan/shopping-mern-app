const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const flash = require('connect-flash')

passport.use('signup', new localStrategy({
    passReqToCallback: true
}, function(req, username, password, done) {
    try {
      let email = req.body.email;
      let usertype = req.body.usertype;
      User.findOne({ username : username }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            // TODO: handle duplicate users
          }
        });
      const user = User.create({ username, email, password, usertype});
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

passport.use('login', new localStrategy({
  usernameField : 'username',
  passwordField : 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username : username });
    if(!user){
      return done(null, false, { message : 'User not found'});
    }

    const valid = await user.validPassword(password);
    if(!valid){
      console.log('hello');
      return done(null, false, { message : 'Wrong Password'});
    }

    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTstrategy({
  secretOrKey : 'key',
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('toke')
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));
