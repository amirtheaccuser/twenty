const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'pwd' },
      (email, pwd, done) => {
        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                { message: 'No user' },
                (err, isMatch) => {
                  if (err) throw err;

                  if (isMatch) {
                    return done(null, user);
                  } else {
                    return done(null, false, { message: 'Password incorrect' });
                  }
                }
              );
            }

            bcrypt.compare(pwd, user.pwd);
          })
          .catch((err) => console.log(err));
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    done(err, user);
  });
};
