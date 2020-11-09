import React from "react";
import { JumbotronContainer } from "../containers/jumbotron";
import { FooterContainer } from "../containers/footer";
import { FaqsContainer } from "../containers/faqs";
import { HeaderContainer } from "../containers/header";
import { Feature, SubscribeForm } from "../components";

function home() {
  return (
    <>
      <HeaderContainer>
        <Feature>
          <Feature.Title>Unlimited movies, TV shows, and more.</Feature.Title>
          <Feature.SubTitle>Watch anywhere. Cancel anytime.</Feature.SubTitle>
          <SubscribeForm>
            <SubscribeForm.Text>
              Ready to watch? Enter your email to create or restart your
              membership.
            </SubscribeForm.Text>
            <SubscribeForm.Break />
            <SubscribeForm.Input placeholder="Email address" />
            <SubscribeForm.Button>Try 30 days free</SubscribeForm.Button>
            <SubscribeForm.Break />
            <SubscribeForm.Text>
              Only new members are eligible for this offer.
            </SubscribeForm.Text>
          </SubscribeForm>
        </Feature>
      </HeaderContainer>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </>
  );
}

export default home;
