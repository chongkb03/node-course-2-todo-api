const MongoClient = require('mongodb').MongoClient;

//connect to DB i.e. TodoApp (can be created dynamically)
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if (err)
    {
      return console.log('Unable to connect to DB server');
    }
  console.log('connected to DB server')
  //Collection = tablename  (can be created dynamically)
  db.collection('Users').insertOne({
    Name: 'Chong  C',
    Age: 55,
    location: 'SG'
  },(err,result)=>{
    if (err){
      return console.log('Unable to insert todo',err);
    }
    console.log(JSON.stringify(result.ops,undefined, 2));
  });
  db.close();
});
