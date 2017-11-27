var env = process.env.NODE_ENV || 'development';
console.log('env ****'+ env +'**');
//env = env.trim();

if (env === 'development' || env === 'test')
{
var config = require('./config.json');
var envConfig = config[env];
Object.keys(envConfig).forEach((key)=>{
  process.env[key] = envConfig[key];
  console.log(key +" : " + process.env[key]);
});


//console.log(config);



}


//if (env.trim() === 'development')
//   {
//   process.env.PORT =  3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
//   console.log('MONGODB (DEVT) ****', process.env.MONGODB_URI);
//   }
//else
//if (env.trim() === 'test')
//  {
//  process.env.PORT =  3000;
//  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
//  console.log('MONGODB (TEST)****', process.env.MONGODB_URI);
//  }
