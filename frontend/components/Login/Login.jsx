import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string().required("Incorrect password")
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" id="email" />
        <ErrorMessage name="email" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" id="password" />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default Login