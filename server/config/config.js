var env = process.env.NODE_ENV || 'development';
console.log('env ****'+ env +'**');

if (env.trim() === 'development')
   {
   process.env.PORT =  3000;
   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
   console.log('MONGODB (DEVT) ****', process.env.MONGODB_URI);
   }
else
if (env.trim() === 'test')
  {
  process.env.PORT =  3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
  console.log('MONGODB (TEST)****', process.env.MONGODB_URI);
  }
