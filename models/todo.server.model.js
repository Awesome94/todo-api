const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const TodoItemsSchema = new Schema ({
  text: String,
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  },
  status: {type: Boolean, default: false}
});

const TodoListSchema = new Schema ({
  text: String,
  CreatedAt:{
    type: Date,
    default: Date.now()
  },
  UpdatedAt: {
    type: Date,
    default: Date.now()
  },
  items: [TodoItemsSchema],
  todoText: String
});

export default mongoose.model('Todo', Schema);
