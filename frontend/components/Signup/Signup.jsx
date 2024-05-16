import React, { useEffect, useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import { Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';


const validationSchema = Yup.object({
  username: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required().oneOf([Yup.ref("password"), null], "Passwords must match"),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions")
})

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  )
}

const MyCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <div>
      <label className='checkbox-input'>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

const Signup = () => {

  return (
    <>
      <div>
        <Button startIcon={<ArrowBackIosNewRoundedIcon />}
          component="a"
          href="/"
        >
          Back
        </Button>
        <IconButton
          color="primary"
          aria-label="Theme toggle button"
        >
          <WbSunnyRoundedIcon fontSize="small" />
        </IconButton>
      </div>
      <Formik

        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptedTerms: false
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {


          setTimeout(() => {

            alert(JSON.stringify(values, null, 2));

            actions.setSubmitting(false);

          }, 1000);

        }}
      >

        <Form>
          <MyTextInput
            label="Username"
            name="username"
            id="username"
            type="text"
          />
          <MyTextInput
            label="Email Address"
            id="email"
            name="email"
            type="text"
          />
          <MyTextInput
            label="Password"
            name="password"
            id="password"
            type="password"
          />
          <MyTextInput
            label="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            type="password"
          />
          <MyCheckBox name="acceptedTerms">
            {" "}I accept the terms and conditions
          </MyCheckBox>

          <Button type="submit" variant='contained'>
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Signup