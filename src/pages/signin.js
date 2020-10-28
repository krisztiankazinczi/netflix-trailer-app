import React, { useState, useContext } from "react";
import { FirebaseContext } from "../contexts/firebase";
import { FooterContainer } from "../containers/footer";
import { HeaderContainer } from "../containers/header";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";
import Firebase from "firebase/app";
import "firebase/auth";

function Signin() {
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const isInvalid = password === "" || email === "";

  const handleSignIn = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleSignInWithFacebook = () => {
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
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignIn} method="POST">
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
              Sign In
            </Form.Submit>
          </Form.Base>
          <Form.Row>
            <Form.Logo src="/images/icons/fb-logo.png" alt="Facebook Logo" />
            <Form.TextSmall onClick={handleSignInWithFacebook} cursor={true}>
              Login with Facebook
            </Form.TextSmall>
          </Form.Row>
          <Form.Text>
            New to Netflix?{" "}
            <Form.Link to={ROUTES.SIGN_UP}>Sign up now.</Form.Link>
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
}

export default Signin;
