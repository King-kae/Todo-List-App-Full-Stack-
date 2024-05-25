import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "@mui/material"
import { login, isAuthenticated, signin, authenticate } from "../../Helpers/authService"

const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirect: false
    })
    const { email, password, error, loading, redirect } = values
    // const { data, isLoading, mutateAsync } = useMutation({ mutationFn: login })
    const { user } = isAuthenticated()
    const handleChange = (e) => {
        const { name, value } =e.target;
        setValues({...values, error:false, [name]: value})
    }
    const clickSubmit = async (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({ email, password })
        .then(data => {
            if (data.status === false) {
                setValues({...values, error: data.message, loading: false})
                console.log(data.message)
            } else {
                authenticate(data, () => {
                    setValues({...values, redirect: true})
                    navigate("/profile")
                    console.log(data)
                })
            }
        }).catch((error) => {
            console.log("Signin request failed")
            console.log(error)
        })
    }
    // useEffect(() => {
    //     if (cookies.jwt) {
    //         navigate("/")
    //     }
    // }, [cookies, navigate])

        return (
            <form onChange={handleChange}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input name="email" type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" id="password" />
                </div>
                <Button onClick={clickSubmit} type="submit" variant='contained'>Submit</Button>
            </form>
        )
    // return (
    //     <Formik
    //         initialValues={{ email: '', password: '' }}
    //         validationSchema={Yup.object({
    //             email: Yup.string()
    //                 .email('Invalid email address')
    //                 .required('Required'),
    //             password: Yup.string().required("Incorrect password")
    //         })}
    //         // onSubmit={async (e, { setSubmitting }) => {
    //         //     const formData = new FormData(event.target);
    //         //     const userData = Object.fromEntries(formData);
    //         //     try {
    //         //         await mutateAsync(userData)
    //         //         console.log('User signed in successfully')
    //         //         console.log(userData)
    //         //         navigate("/profile")
    //         //         // if (response.status === 200) {
    //         //         //     navigate("/")
    //         //         // }

    //         //     } catch (error) {
    //         //         console.log(error)
    //         //         console.log(error.response.data.message)
    //         //     }
    //         //     setSubmitting(false)
    //         // }
    //         // }
    //     >
    //         <Form onSubmit={clickSubmit}>
    //             <label htmlFor="email">Email Address</label>
    //             <Field name="email" type="email" id="email" />
    //             <ErrorMessage name="email" />

    //             <label htmlFor="password">Password</label>
    //             <Field name="password" type="password" id="password" />
    //             <ErrorMessage name="password" />

    //             <Button type="submit" variant='contained'>Submit</Button>
    //         </Form>

    //     </Formik>
    // );
};

export default Login