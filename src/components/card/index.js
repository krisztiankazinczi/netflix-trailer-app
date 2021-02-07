import React, { useState, useContext, createContext, useRef, useCallback, forwardRef } from "react";
import { usePlayerState } from "../../contexts/player";
import descriptionShortener from "../../utils/descriptionShortener";
import useLoadMovies from "../../hooks/useLoadMovies";
import LazyLoad from 'react-lazy-load';


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
  LoadingGroup,
  LoadingEntity
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
// infinite scrolling component
Card.Entities = function CardEntities({ rowItem, mainCategory, loadMoreMovies, language, ...restProps }) {
  const { 
    loading, 
    error, 
    loadNewMoviesInCategory 
  } = useLoadMovies(mainCategory, rowItem.category, language);

  const observer = useRef(null);
  const lastMovieElementRef = useCallback(node => {
    if (!loadMoreMovies) return;
    
    // I disconnect the previous observer if more data is fetched down
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadNewMoviesInCategory();
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  return (
    <Entities 
      {...restProps}
    >
      {rowItem.data.map(
        (item, index) => {
          if (rowItem.data.length === index + 1) {
            return (
              item && (
                <LazyLoad offsetHorizontal={400}>
                  <Card.Item
                    ref={lastMovieElementRef}
                    key={`${item.id}-${Math.floor(Math.random() * 1000)}`}
                    item={item}
                  >
                    <LazyLoad offsetHorizontal={400}>
                      <Card.Image
                        src={item.poster}
                      />
                    </LazyLoad>
                    <Card.Meta>
                      <Card.SubTitle>{item.title}</Card.SubTitle>
                      <Card.Text>
                        {descriptionShortener(item.description)}
                      </Card.Text>
                    </Card.Meta>
                  </Card.Item>
                </LazyLoad>
              )
            )
          } else {
            return (
              item && (
                <Card.Item
                key={`${item.id}-${Math.floor(Math.random() * 1000)}`}
                item={item}
                >
                <LazyLoad offsetHorizontal={400} onContentVisible={() => console.log(item.title)}>
                    <Card.Image
                      src={item.poster}
                    />
                  </LazyLoad>
                  <LazyLoad offsetHorizontal={400}>
                    <Card.Meta>
                      <Card.SubTitle>{item.title}</Card.SubTitle>
                      <Card.Text>
                        {descriptionShortener(item.description)}
                      </Card.Text>
                    </Card.Meta>
                </LazyLoad>
                  </Card.Item>
              )
            )
          }
        }
          
      )}
      {loading && <h3>Loading....</h3>}
    </Entities>
  ) 
}


Card.Meta = ({ children, ...restProps }) => (
  <Meta {...restProps}>{children}</Meta>
);

// with this wrapped component, I can pass ref props to this component!!!! Without this it's not working
Card.Item = forwardRef(({ item, children, ...restProps }, ref) => {
  const { setShowFeature, setItemFeature } = useContext(FeatureContext);
  const { setSelectedMovieTitle } = usePlayerState();

  const handleClick = () => {
    setItemFeature(item);
        setShowFeature(true);
        setSelectedMovieTitle(item.title);
  }

  return (
    <Item
      ref={ref}
      onClick={handleClick}
      {...restProps}>
      {children}
    </Item>
  );
});

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

Card.LoadingGroup = function CardLoadingGroup() {
  return (
    <LoadingGroup>
      <p>Loading....</p>
    </LoadingGroup>
  )
}

Card.LoadingEntity = function CardLoadingEntity() {
  return (
    <LoadingEntity>
      <p>Loading....</p>
    </LoadingEntity>
  )
}


