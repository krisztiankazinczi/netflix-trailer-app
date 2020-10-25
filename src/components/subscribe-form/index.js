import React from "react";

import { Container, Input, Button, Text, Break } from "./styles/subscribe-form";

const SubscribeForm = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

SubscribeForm.Input = function SubscribeFormInput({ ...restProps }) {
  return <Input {...restProps} />;
};

SubscribeForm.Button = function SubscribeFormButton({
  children,
  ...restProps
}) {
  return (
    <Button {...restProps}>
      {children} <img src="/images/icons/chevron-right.png" alt="Try now" />
    </Button>
  );
};

SubscribeForm.Text = function SubscribeFormText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

SubscribeForm.Break = function SubscribeFormBreak({ children, ...restProps }) {
  return <Break {...restProps} />;
};

export default SubscribeForm;
