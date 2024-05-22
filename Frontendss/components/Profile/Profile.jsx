import React, { useState } from 'react';
import { TextField, Box, Button } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../Helpers/authService"
import { profileHandler, getUser } from "../../Helpers/authService"
import Avatar from "@mui/material/Avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios"

const validationSchema = Yup.object({
    username: Yup
        .string()
        .required('Username is required'),
})

const Profile = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ["User"],
        queryFn: async () =>{
            try {
                const { data }= await axios.get('http://localhost:3000/auth/profile')
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })

    if(isPending) return "Loading..";

    if (error) return 'An error has occurred: ' + error.message

    console.log(data)

    const [user, setUser] = useState()
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
        initialValues: {
            username: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await mutateAysnc(values)
                setUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <Box>
            <Avatar />
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
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

export default Profile;