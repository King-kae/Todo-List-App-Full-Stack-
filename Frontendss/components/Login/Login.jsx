import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "@mui/material"
import { login } from "../../Helpers/authService"

const Login = () => {
    const navigate = useNavigate()
    const { data, isLoading, mutateAsync } = useMutation({ mutationFn: login })

    // useEffect(() => {
    //     if (cookies.jwt) {
    //         navigate("/")
    //     }
    // }, [cookies, navigate])


    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string().required("Incorrect password")
            })}
            onSubmit={async (e, { setSubmitting }) => {
                const formData = new FormData(event.target);
                console.log(formData)
                const userData = Object.fromEntries(formData);
                try {
                    await mutateAsync(userData)
                    console.log('User signed in successfully')
                    console.log(userData)
                    // if (response.status === 200) {
                    //     navigate("/")
                    // }

                } catch (error) {
                    console.log(error)
                    console.log(error.response.data.message)
                }
                setSubmitting(false)
            }

            }
        >
            <Form>
                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" id="email" />
                <ErrorMessage name="email" />

                <label htmlFor="password">Password</label>
                <Field name="password" type="password" id="password" />
                <ErrorMessage name="password" />

                <Button type="submit" variant='contained'>{isLoading ? "Submitting" : "Submit"}</Button>
            </Form>

        </Formik>
    );
};

export default Login