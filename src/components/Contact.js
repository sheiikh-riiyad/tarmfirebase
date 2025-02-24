import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Contact() {

const gotofacebook = ()=>{
  window.location.href = "https://www.facebook.com/profile.php?id=100067051748173"
}

  return (
<>
<Card style={{width: "50%", marginBottom: "5px", marginLeft:"10px", marginTop: "10px" }}>
         <Card.Body ><p>Address: Islampur, Muraripur, Setabgonj, Dinajpur.</p> <br/>
         <p>Phone Number: +8801710666995</p> <br/>
         <p>Whatsapp : +8801710666995</p> <br/>
         <p>Email: tarmldt@gmail.com, tarmltd@outlook.com</p>
         </Card.Body>
         
    </Card>

    <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button
            onClick={gotofacebook}
              variant="outline-primary" 
              style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "50%", 
                marginRight: "5px"
              }}
            >
              F
            </Button>
            <Button 
              variant="outline-danger" 
              style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "50%", 
              
              }}
            >
              P
            </Button>
      </div>


    <div style={{ textAlign: "center", padding: "20px" }}>
      
      <h2>Our Location</h2>
      <div style={{ width: "100%", height: "400px" }}>
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.975443202139!2d88.47456348669239!3d25.837354482797938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4c8023d06c137%3A0x4d20583faf76dee7!2sTalukder%20Auto%20Rice%20Mill!5e0!3m2!1sen!2sbd!4v1740399971478!5m2!1sen!2sbd"
          allowFullScreen
        ></iframe>
      </div>
    </div>
    
    </>
  );
}

export default Contact;
