import axios from "axios";

export const getTodos = async () => {
    const { data } = await axios.get('http://localhost:3000/todo/all');
    return data;
};

