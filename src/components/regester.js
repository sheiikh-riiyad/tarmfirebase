import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Form Validation Schema
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string(),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        setError(""); 
        navigate("/"); // Redirect to login page after successful registration
      } catch (err) {
        handleFirebaseError(err.code);
      }
    },
  });

  // Google Sign-in
  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError("");
      navigate("/"); // Redirect to home page after successful Google signup
    } catch (err) {
      handleFirebaseError(err.code);
    }
  };

  // Custom Firebase Error Handling
  const handleFirebaseError = (errorCode) => {
    const errorMessages = {
      "auth/email-already-in-use": "Email already in use. Try logging in.",
      "auth/invalid-email": "Invalid email address.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/network-request-failed": "Network error. Check your connection.",
    };

    setError(errorMessages[errorCode] || "An unexpected error occurred. Try again.");
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit} style={{ width: "30%", margin: "0 auto" }}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstname"
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.firstname}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastname"
            type="text"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.lastname}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.email}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.phone}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.password}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.confirmPassword}</div>
          ) : null}
        </Form.Group>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <Button type="submit" variant="outline-success">
          Register
        </Button>
        <span> or </span>
        <a href="/login">Login</a> <br />
        <span style={{ marginLeft: "150px" }}>or login with other options</span>
      </Form>

      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button onClick={signinWithGoogle} variant="outline-warning">
              GOOGLE
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
