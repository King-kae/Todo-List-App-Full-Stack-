const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).json({ todos, message: "get all todo" });
};


const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.status(200).json({ todo, message: "get todo" });
};

const saveTodo = async (req, res) => {
  try {
    const todos = new Todo(req.body);
    await todos.save();
    res.status(201).json({ todos, message: "post todo success" });
  } catch (error) {
    console.log(error.message, "error in saveTodo");
  }
};

const updateTodo = async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    const todos = await Todo.find({});
    res.status(201).json({ todos, message: "update todo success" });
  } catch (error) {
    console.log(error.message, "error in saveTodo");
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "delete todo success" });
  } catch (error) {
    console.log(error.message, "error in delete todo");
  }
};

const completedTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    todo.completed= !todo.completed;
    todo.save();
    res.status(200).json({ todo, message: "completed todo success" });
  } catch (error) {
    console.log(error.message, "error in completed todo");
  }
};




module.exports = {
    getTodos,
    getTodoById,
    saveTodo,
    updateTodo,
    deleteTodo,
    completedTodo
}