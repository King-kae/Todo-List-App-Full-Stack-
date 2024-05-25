import React, { useState, useEffect } from 'react';
import { TextField, Box, Button } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from "../../Helpers/authService"
import { profileHandler, getUser, isAuthenticated, update, updateUser } from "../../Helpers/authService"
import Avatar from "@mui/material/Avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"

const validationSchema = Yup.object({
    username: Yup
        .string()
        .required('Username is required'),
})

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        success: false
    })
    console.log("values from profile", values)
    const { token } = isAuthenticated()
    const { username, email, password, success } = values

    const init = async (username) => {
        try {
            const response = await getUser(username, token)
            setValues({ ...values, username: response.username, email: response.email, password: response.password })
        } catch (error) {
            console.log(error)
        }
    }
    const params = useParams()

    useEffect(() => {
        init(match.params.username)
    }, [])

    const handleChange = (username, e) => {
        setValues({ ...values, [username]: e.target.value })
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        update(match.params.username, token, { username, email, password }).then(
            (data = []) => {
                if (data && data.error) {
                    console.log(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            username: data.name,
                            email: data.email,
                            success: true
                        });
                    });
                }
            }
        );

    }
    const navigate = useNavigate()
    // const { data, isLoading, error, mutateAysnc } = useMutation({
    //     mutationFn: getUser
    // })

    const logoutHandler = async () => {
        await logout()
        delete("jwt")
        navigate("/login")

    }

    const formik = useFormik({
        validationSchema: validationSchema,
    })

   const profileUpdate = (username, email, password) => {
    return (
        <Box>
            <Avatar />
            <form onSubmit={handleSubmit}>
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    value={username}
                    // onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={email}
                    // onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    value={password}
                    // onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button type="submit">Submit</Button>
            </form>
            {user && <Box>{user.username}</Box>}
            <Button
                onClick={logoutHandler}
            >Logout</Button>
        </Box>
    )
   }

}

export default Profile;