import React from "react";

import faqsData from "../data/faqs.json";

import { Accordion, SubscribeForm } from "../components";

const FaqsContainer = () => {
  return (
    <Accordion>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      <Accordion.Frame>
        {faqsData.map((item) => (
          <Accordion.Item key={item.id}>
            <Accordion.Header>{item.header}</Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion.Frame>

      <SubscribeForm>
        <SubscribeForm.Text>
          Ready to watch? Enter your email to create or restart your membership.
        </SubscribeForm.Text>
        <SubscribeForm.Input placeholder="Email address" />
        <SubscribeForm.Button>Try 30 days free</SubscribeForm.Button>
        <SubscribeForm.Break />
      </SubscribeForm>
    </Accordion>
  );
};

export { FaqsContainer };
