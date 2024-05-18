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

