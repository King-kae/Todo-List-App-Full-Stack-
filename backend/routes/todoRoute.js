const {
    getTodos,
    getTodoById,
    saveTodo,
    deleteTodo,
    updateTodo,
    completedTodo,
} = require("../controllers/todo");

const router = require("express").Router();

router.get("/all", getTodos);
router.get("/:id", getTodoById);
router.post("/", saveTodo);
router.put("/update/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.put("/completed/:id", completedTodo);

module.exports = router;