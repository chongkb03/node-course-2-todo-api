require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenicate} = require('./middleware/authenicate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenicate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos',authenicate, (req, res) => {
  Todo.find({_creator: req.user._id}).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenicate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

//  Todo.findById(id).then((todo) => {
  Todo.findOne({
   _id: id,
   _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', authenicate, (req, res) => {
  var id = req.params.id;


  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', authenicate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator:req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// Register Users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    //1st return to ensure that then() is called with parameter token passed
     return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});






//Authenicate before proceeding to access users info.
app.get('/users/me', authenicate, (req, res) => {
  res.send(req.user);
});


//Chk for correct login user
app.post('/users/login', (req,res) =>{
  var body = _.pick(req.body, ['email', 'password']);
User.findByCredentials(body.email, body.password).then((user)=>{
  // errors returned by function will be handled by catch
  return user.generateAuthToken().then((token)=>{
    res.header('x-auth',token).send(user);
  })
  //res.send(user);
}).catch((e)=>{
  res.status(400).send(e);
});
});


//Delete user
app.delete('/users/me/token', authenicate, (req,res) =>{
//  console.log('REQ BODY ', req.user);
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
    },()=>{res.status(400).send();}
  );
});





app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
