import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Google Provider
const googleProvider = new GoogleAuthProvider();

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Form Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Formik for handling form state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        setError(""); // Clear any previous errors
        navigate("/"); // Redirect to home page after successful login
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
      navigate("/"); // Redirect to home page after successful Google login
    } catch (err) {
      handleFirebaseError(err.code);
    }
  };

  // Custom error handler for Firebase
  const handleFirebaseError = (errorCode) => {
    const errorMessages = {
      "auth/invalid-credential": "Invalid username or password",
      "auth/user-not-found": "User not found. Please register.",
      "auth/wrong-password": "Incorrect password. Try again.",
      "auth/too-many-requests": "Too many attempts. Try again later.",
      "auth/network-request-failed": "Network error. Check your connection.",
    };

    setError(errorMessages[errorCode] || "An unexpected error occurred. Try again.");
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit} style={{ width: "30%", margin: "0 auto" }}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.email}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red", fontSize: "14px" }}>{formik.errors.password}</div>
          ) : null}
        </Form.Group>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <Button type="submit" variant="outline-primary">
          Login
        </Button>
        <span> or </span>
        <a disabled href="/">Register</a> <br />
        <span style={{ marginLeft: "150px" }}>or login with</span>
      </Form>

      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button  onClick={signinWithGoogle} variant="outline-warning">
              GOOGLE
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
