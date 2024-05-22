import axios from "axios";

export const getTodos = async () => {
    const { data } = await axios.get('http://localhost:3000/todo/all');
    return data;
};

export const addTodo = async (todo) => {
    await axios
        .post('http://localhost:3000/todo', 
        todo, 
        { withCredentials: true }
    )
    return data;
}

export const updateTodo = async (todo, id) => {
    await axios
        .put(`http://localhost:3000/todo/update/${id}`, 
        { title : todo }, 
        { withCredentials: true }
    )
}

export const deleteTodo = async (id) => {
    await axios
        .delete(`http://localhost:3000/todo/${id}`, 
        { withCredentials: true }
    )
}
