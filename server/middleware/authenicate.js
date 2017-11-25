var {User} = require('./../models/user');

var authenicate = (req, res, next)  =>{
  var token = req.header('x-auth');
  User.findByToken(token).then((user)=>{
    if (!user)
    {
      // catch will process promise function output string
      return Promise.reject('Token is valid but no record found');
    }
    req.user = user;
    req.token = token;
    next();

  }).catch((e)=>{
    res.status(401).send(e);
  });
};

module.exports = {authenicate};
