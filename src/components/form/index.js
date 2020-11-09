import React from "react";
import {
  Container,
  Base,
  Error,
  Title,
  Text,
  TextSmall,
  Link,
  Input,
  Submit,
  Row,
  Logo,
  FbButton,
} from "./styles/form";

const Form = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Form.Error = ({ children, ...restProps }) => (
  <Error {...restProps}>{children}</Error>
);

Form.Base = ({ children, ...restProps }) => (
  <Base {...restProps}>{children}</Base>
);

Form.Title = ({ children, ...restProps }) => (
  <Title {...restProps}>{children}</Title>
);

Form.Text = ({ children, ...restProps }) => (
  <Text {...restProps}>{children}</Text>
);

Form.TextSmall = ({ children, ...restProps }) => (
  <TextSmall {...restProps}>{children}</TextSmall>
);

Form.Link = ({ children, ...restProps }) => (
  <Link {...restProps}>{children}</Link>
);

Form.Input = ({ children, ...restProps }) => (
  <Input {...restProps}>{children}</Input>
);

Form.Submit = ({ children, ...restProps }) => (
  <Submit {...restProps}>{children}</Submit>
);

Form.Row = ({ children, ...restProps }) => <Row {...restProps}>{children}</Row>;

Form.Logo = ({ children, ...restProps }) => (
  <Logo {...restProps}>{children}</Logo>
);

Form.FbButton = ({ children, ...restProps }) => (
  <FbButton {...restProps}>{children}</FbButton>
);

export default Form;
