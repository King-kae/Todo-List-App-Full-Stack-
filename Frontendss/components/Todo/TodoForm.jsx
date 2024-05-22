import { useMutation } from "@tanstack/react-query";
import { addTodo, updateTodo } from "../../Helpers/todoService";


const TodoForm = ({ title, setTitle, edit, setEdit, todoId}) => {
    const { isLoading, mutateAsync } = useMutation({
        mutationFn: addTodo
    });

    const sendForm = async (e) => {
        e.preventDefault();

        try{
            await mutateAsync({ title })
            setTitle("")
            console.log("Successfully added todo")
        } catch (error) {
            console.log(error)
        }
    };
    const updateForm = async (e) => {
        e.preventDefault();

        try {
            await updateTodo({ todoId, title })
            setTitle("");
            setEdit(false)
            console.log("Updated todo title successfully")
        } catch (error){
            console.log(error)
        }

    }


    return (
        <form 
            onSubmit={edit ? updateForm : sendForm}
        >
            <input
                type="text"
                value={title}
                
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a todo"
            />
            <button type="submit">
                {edit ? "Update" : "Add"}
                    </button>
        </form>
    )
}