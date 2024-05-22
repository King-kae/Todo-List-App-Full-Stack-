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


// Create a new todo
const addTodo = async (req, res) => {
  try {
    const todos = req.body
    await Todo.create(todos);
    res.status(201).json({ todos, message: "Created a todo successfully" });
  } catch (error) {
    console.log(error.message, "error in saveTodo");
  }
};

const updateTodo = async (req, res) => {
  try {
    const title = req.body
    const id = req.params.id
    const todos = await Todo.findByIdAndUpdate(
      id,
      title,
      { new: true }
    );
    res.status(201).json({ todos, message: "update todo success" });
  } catch (error) {
    console.log(error.message, "error in saveTodo");
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "delete todo success" });
  } catch (error) {
    console.log(error.message, "error in delete todo");
  }
};

const completedTodo = async (req, res) => {
  try {
    const id = req.params.id;
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
    addTodo,
    updateTodo,
    deleteTodo,
    completedTodo
}