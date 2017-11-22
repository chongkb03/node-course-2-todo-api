const MongoClient = require('mongodb').MongoClient;

//connect to DB i.e. TodoApp (can be created dynamically)
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err)
    {
      return console.log('Unable to connect to DB server');
    }
  console.log('connected to DB server')

db.collection('Users').findOneAndUpdate({location: 'SG'},{$set: {Name:'Chong K B'}, $inc: {Age: 1}},{returnOriginal: false}).then((result) =>{
console.log('updating result : ', result);
}, (err)=>{
console.log('Unable to fetch todos', err);
});


  //db.close();
});
