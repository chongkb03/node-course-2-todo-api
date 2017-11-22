const MongoClient = require('mongodb').MongoClient;

//connect to DB i.e. TodoApp (can be created dynamically)
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err)
    {
      return console.log('Unable to connect to DB server');
    }
  console.log('connected to DB server')
  //Collection = tablename  (can be created dynamically)
  //delete all that matches
////  db.collection('Users').deleteMany({text: 'Eat lunch'}).then((result) =>{
//  console.log('deleting res : ', result);
//}, (err)=>{
//  console.log('Unable to fetch todos', err);
// });


//delete first rec of all that matches
//db.collection('Users').deleteOne({text: 'Eat lunch'}).then((result) =>{
//console.log('deleting res : ', result);
//}, (err)=>{
//console.log('Unable to fetch todos', err);
//});

db.collection('Users').findOneAndDelete({location: 'SG'}).then((result) =>{
console.log('deleting res : ', result);
}, (err)=>{
console.log('Unable to fetch todos', err);
});


  //db.close();
});
