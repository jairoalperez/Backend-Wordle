const passport= require('passport');

const passportAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({
        err: info,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({
          err: 'Could not log in user',
          failureRedirect:'/login'
        });
      }
      res.status(200).send({
        status: 200,
        msg:'Login successful!'
      });
    });
  })(req, res, next);
};

module.exports={
  passportAuth
}