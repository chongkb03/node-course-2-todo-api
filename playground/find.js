const MongoClient = require('mongodb').MongoClient;

//connect to DB i.e. TodoApp (can be created dynamically)
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err)
    {
      return console.log('Unable to connect to DB server');
    }
  console.log('connected to DB server')
  //Collection = tablename  (can be created dynamically)
  db.collection('Users').find({_id: '5a1543c5b01af51e10600c43'}).toArray().then((docs) =>{
  console.log('finding');
  console.log(JSON.stringify(docs,undefined,2));
}, (err)=>{
  console.log('Unable to fetch todos', err);
});



  //db.close();
});
