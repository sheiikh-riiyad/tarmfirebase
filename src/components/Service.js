import React from 'react'
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from "react-bootstrap";

function Service() {
  return (
    <>
   <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
           <h1>TALUKDER AUTO RICE MILL</h1>
          </Col>
        </Row>
      </Container>

    <Card style={{width: "50%", marginBottom: "5px", marginLeft:"10px", marginTop: "10px" }}>
         <Card.Body >PADDY CRUSHING| Bring your paddy to us and we will convert it into rice at an affordable price. </Card.Body>
         
    </Card>
    </>
  )
}

export default Service