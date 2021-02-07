import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../components";
import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "../contexts/firebase";
import logo from "../logo.svg";

const HeaderContainer = ({ children }) => {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const handleDemoLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword('demouser@gmail.com', '123456')
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Header>
      <Header.Frame>
        <Header.Logo to={ROUTES.HOME} alt="Netflix" src={logo} />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '225px'}}>
          <Header.DemoButtonLink onClick={handleDemoLogin}>Demo Login</Header.DemoButtonLink>
          <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink>
        </div>
      </Header.Frame>
      {children}
    </Header>
  );
};

export { HeaderContainer };
