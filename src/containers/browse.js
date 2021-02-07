import React, { useState, useEffect, useContext } from "react";
import LazyLoad from "react-lazyload";


import SelectProfileContainer from "./profiles";
import { FooterContainer } from "./footer";
import { FirebaseContext } from "../contexts/firebase";
import { Header, Loading, Card, Player } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { PlayerProvider } from "../contexts/player";
import movieSearch from "../utils/movieSearch";


const BrowseContainer = ({ movies, loadingMovies, language, setLanguage, randomMovie }) => {
  const [category, setCategory] = useState("films");
  const [rows, setRows] = useState(null);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [loadMoreMovies, setLoadMoreMovies] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  // show films or tv series
  useEffect(() => {
    if (!movies[category]) {
      setRows(null)
    }
    console.log("lefut ez a kod?")
    setRows(movies[category]);
  }, [movies, category]);

  useEffect(() => {

    if (!movies[category]) return;

    const lowercaseSearchTerm = searchTerm.toLowerCase();

    const filteredMovies = movieSearch(movies[category], lowercaseSearchTerm);

    if (Object.keys(filteredMovies).length > 0) {
      setRows(filteredMovies);
    } else {
      setRows(null);
    }

  }, [searchTerm]);



  return profile.displayName ? (
    <>
    <PlayerProvider>
      {loading || loadingMovies ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

      <Header src={randomMovie.poster} dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} alt="Netflix" src={logo} />
            <Header.TextLink
              active={category === "series" ? "true" : "false"}
              onClick={() => setCategory("series")}>
              Series
            </Header.TextLink>
            <Header.TextLink
              active={category === "films" ? "true" : "false"}
              onClick={() => setCategory("films")}>
              Films
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.LangDropDown
              language={language}
              setLanguage={setLanguage}
            />
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setLoadMoreMovies={setLoadMoreMovies}
            />
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign Out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
        <Header.Feature>
          <Header.FeatureCallOut>
            Watch {randomMovie.title} Now
          </Header.FeatureCallOut>
          <Header.Text>{randomMovie.description}</Header.Text>
          <Header.PlayButton movieTitle={randomMovie.title}>Play</Header.PlayButton>
          <Player>
            <Player.Video />
          </Player>
        </Header.Feature>
      </Header>
      {rows && (
          <Card.Group style={{marginTop: '40px'}}>
            {Object.values(rows).map((rowItem, id) => (
              <LazyLoad placeholder={<Card.LoadingGroup />} offset={500} once>
                <Card key={`${rowItem.category}-${Math.random() * 1000}`}>
                  <Card.Title>{rowItem.category}</Card.Title>
                  <LazyLoad once>
                    <Card.Entities
                      rowItem={rowItem}
                      mainCategory={category}
                      loadMoreMovies={loadMoreMovies}
                      language={language}
                    />
                  </LazyLoad>
                  <Card.Feature category={category}>
                    <Player>
                      <Player.Button />
                    </Player>
                  </Card.Feature>
                </Card>
             </LazyLoad>
            ))}
          </Card.Group>
      )}
      </PlayerProvider>
      <FooterContainer />
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
};

export default BrowseContainer;
