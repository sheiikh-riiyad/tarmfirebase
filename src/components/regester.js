import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {app} from '../firebase'


const auth = getAuth(app)

function Regester() {
    
const [email, setEmail]= useState("")
const [password, setPassword]= useState("")

const createuser = () =>{
    createUserWithEmailAndPassword(auth, email, password)
}
  return (
    <>
      <Form style={{ width: '30%', margin: '0 auto' }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label >First Name</Form.Label>
          <Form.Control name='firstname' type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name='lastname' type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} name='email' type="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control name='phon' type="tel" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} name='password' type="password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        
        <Button onClick={createuser} variant="outline-success">Register</Button> 
        <span>or</span> 
        <a href='/Login'>Login</a> <br/>
        
        <span style={{ marginLeft: "150px" }}>or login with other options</span>
      </Form>

      {/* Centering the Google Button */}
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="outline-warning">GOOGLE</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Regester;
