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

export const signupHandler = async (data, navigate, statusCallback, errorCallback) => {
    try {
        const req = await signup(data)
        statusCallback(req.status)
        setTimeout(() => navigate('/'), 1000)
    } catch (err) {
        errorCallback(err)
    }
}