const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10,(err,salt)={
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log()
  });
});



var data = {
    id: 10
}
var token = jwt.sign(data, '123abc');
console.log('token :'+ token);


var decoded = jwt.verify(token,'123abc');
console.log('decoded: '+JSON.stringify(decoded));
