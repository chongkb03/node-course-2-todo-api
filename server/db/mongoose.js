var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

//console.log('URI IN MONGOOSE '+ process.env.MONGODB_URI);

module.exports = {mongoose};
