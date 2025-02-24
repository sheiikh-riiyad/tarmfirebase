import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';  // Importing some social icons

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0', marginTop: '20px' }}>
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Talukder Auto Rice Mill</h5>
            <p>We are a leading rice mill based in Islampur, Muraripur, Setabgonj, Dinajpur. Providing quality rice products for the region and beyond.</p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Address: Islampur, Muraripur, Setabgonj, Dinajpur</p>
            <p>Phone: +8801710666995</p>
            <p>Email: tarmldt@gmail.com</p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <div>
              <a href="https://www.facebook.com/profile.php?id=100067051748173" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                <FaFacebook size={30} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100067051748173" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                <FaTwitter size={30} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100067051748173" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <p>&copy; 2025 Talukder Auto Rice Mill. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
