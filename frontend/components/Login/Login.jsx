import React, { useEffect } from 'react';
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from "../../Helpers/authService"

const Login = () => {
    const [cookies] = useCookies(["jwt"])
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
      onSubmit={ async (e) => {
        const formData = new FormData(event.target);
    console.log(formData)
    const userData = Object.fromEntries(formData);
        try{
            await mutateAsync(userData)
            console.log('User signed in successfully')
            console.log(userData)
            

        } catch(error) {
            console.log(error)
            console.log(error.response.data.message)
        }
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

        <button type="submit">{isLoading ? "Submitting" : "Submit"}</button>
      </Form>
    </Formik>
  );
};

export default Login