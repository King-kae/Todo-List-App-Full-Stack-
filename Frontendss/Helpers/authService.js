import axios from "axios";

export const signup = async (data) => {
    await axios
    .post(
        "http://localhost:3000/auth/signup",
        {...data},
        { withCredentials: true }
    )
    .then((res) => res.data)
};

export const login = async (data) => {
    await axios.post(
        "http://localhost:3000/auth/login",
        {...data},
        { withCredentials: true }
    )
    .then((res) => res.data)
}


export const logout = async () => {
    await axios.get("http://localhost:3000/auth/logout", { withCredentials: true })
    .then((res) => res.data)
}

export const getUser = async () => {
    const token = localStorage.getItem("jwt")
    await axios.get("http://localhost:3000/auth/pofile", { headers: { Authorization: `Bearer ${token}` }})
    .then((res) => res.data)
}
export const profileHandler = async () => {
    try {
        const request = await getUser()
        return request;
    } catch (error){
        console.log(error.response.data.message)
    }
}