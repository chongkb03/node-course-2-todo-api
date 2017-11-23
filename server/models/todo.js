var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
  //default: 'hello default',
  required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
//module.exports.Todo = Todo;
