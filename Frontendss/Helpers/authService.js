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

export const signin = async (userObj) => {
    try {
        const response = await fetch(`http://localhost:3000/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const logout = async () => {
    await axios.get("http://localhost:3000/auth/logout", { withCredentials: true })
    .then((res) => res.data)
}

export const getUser = async (username, token) => {
    try {
        const response = await fetch(`http://localhost:3000/auth/profile/${username}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export const update = async (username, token, user) => {
    try {
        const response = await fetch(`http://localhost:3000/auth/profile/${username}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};


export const profileHandler = async () => {
    try {
        const request = await getUser()
        return request;
    } catch (error){
        console.log(error.response.data.message)
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt")); // prior: true || this JSON is here because we need to fetch the data to populate userDashboard
    } else {
        return false;
    }
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};