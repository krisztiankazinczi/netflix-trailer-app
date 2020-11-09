import React, { useState, useContext, createContext } from "react";
import { usePlayerState } from "../../contexts/player";

import {
  Container,
  Group,
  Title,
  SubTitle,
  Text,
  Feature,
  FeatureTitle,
  FeatureText,
  FeatureClose,
  Content,
  Meta,
  Entities,
  Item,
  Image,
} from "./styles/card";

export const FeatureContext = createContext();
// if user clicks on a movie image, a dropdown card will pop up

export default function Card({ children, ...restProps }) {
  const [showFeature, setShowFeature] = useState(false);
  const [itemFeature, setItemFeature] = useState({});

  return (
      <FeatureContext.Provider
        value={{ showFeature, setShowFeature, itemFeature, setItemFeature }}>
        <Container {...restProps}>{children}</Container>
      </FeatureContext.Provider>
  );
}

// holds all the card in all category
Card.Group = ({ children, ...restProps }) => (
  <Group {...restProps}>{children}</Group>
);

Card.Title = ({ children, ...restProps }) => (
  <Title {...restProps}>{children}</Title>
);

Card.SubTitle = ({ children, ...restProps }) => (
  <SubTitle {...restProps}>{children}</SubTitle>
);

Card.Text = ({ children, ...restProps }) => (
  <Text {...restProps}>{children}</Text>
);

// holds all the movies or series in a category
Card.Entities = ({ children, ...restProps }) => (
  <Entities {...restProps}>{children}</Entities>
);

Card.Meta = ({ children, ...restProps }) => (
  <Meta {...restProps}>{children}</Meta>
);

Card.Item = function CardItem({ item, children, ...restProps }) {
  const { setShowFeature, setItemFeature } = useContext(FeatureContext);
  const { setSelectedMovieTitle } = usePlayerState();

  const handleClick = () => {
    setItemFeature(item);
        setShowFeature(true);
        setSelectedMovieTitle(item.title);
  }

  return (
    <Item
      onClick={handleClick}
      {...restProps}>
      {children}
    </Item>
  );
};

Card.Image = ({ ...restProps }) => <Image {...restProps} />;

Card.Feature = function CardFeature({ children, category, ...restProps }) {
  const { showFeature, itemFeature, setShowFeature } = useContext(
    FeatureContext
  );

  return showFeature ? (
    <Feature {...restProps} src={itemFeature.poster_big}>
      <Content>
        <FeatureTitle>{itemFeature.title}</FeatureTitle>
        <FeatureText>
          {itemFeature.description}
        </FeatureText>
        <FeatureClose onClick={() => setShowFeature(false)}>
          <img src="/images/icons/close.png" alt="Close" />
        </FeatureClose>

        {children}
      </Content>
    </Feature>
  ) : null;
};
