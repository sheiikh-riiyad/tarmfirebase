import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';  // Assuming you're importing the Firebase app correctly
import Card from 'react-bootstrap/Card';

const auth = getAuth(app);

function Console() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (

    <>
              <div>
                {user ? (
                  <p>You are logged in as {user.email}</p>
                ) : (
                <Card style={{textAlign: "center"}}>
                  <Card.Body><h1>YOU NEED TO LOGIN</h1> </Card.Body>
                </Card>
                )}
              </div>
    </>
  );
}

export default Console;
