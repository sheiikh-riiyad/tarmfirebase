import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {app} from '../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app)
function Login() {

  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")

  const sign = ()=>{
    signInWithEmailAndPassword(auth, email, password)
  }
  return (
    <>
     <Form style={{ width: '30%', margin: '0 auto' }}>
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} name='email' type="email" placeholder="email address" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} name='password' type="password" placeholder="password" />
      </Form.Group>
      <Button onClick={sign}  variant="outline-primary">Login</Button> <span>or</span> <a href='/Regester'>Register</a> <br/>
    <span style={{ marginLeft: "150px" }}>or login other</span>
    </Form>
    </>
  )
}

export default Login