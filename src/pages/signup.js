import React, { useState, useContext } from "react";
import { FirebaseContext } from "../contexts/firebase";
import { FooterContainer } from "../containers/footer";
import { HeaderContainer } from "../containers/header";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";
import Firebase from "firebase/app";
import "firebase/auth";

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const isInvalid = firstName === "" || password === "" || email === "";

  const handleSignup = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({
            displayName: firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
          })
          .then(() => {
            history.push(ROUTES.BROWSE);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignUpWithFacebook = () => {
    const fbProvider = new Firebase.auth.FacebookAuthProvider();

    Firebase.auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignup} method="POST">
            <Form.Input
              placeholder="Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Form.Input
              placeholder="Email address"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Form.Input
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit">
              Sign Up
            </Form.Submit>
          </Form.Base>
          <Form.FbButton onClick={handleSignUpWithFacebook}>
            Sign Up with Facebook
          </Form.FbButton>
          <Form.Text>
            Already a user?
            <Form.Link to={ROUTES.SIGN_IN}> Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <Form.Link>Learn more</Form.Link>
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
};

export default Signup;
