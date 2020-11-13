import React, { useState, useEffect, useContext } from "react";

import SelectProfileContainer from "./profiles";
import { FooterContainer } from "./footer";
import { FirebaseContext } from "../contexts/firebase";
import { Header, Loading, Card, Player } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import descriptionShortener from "../utils/descriptionShortener";
import { PlayerProvider } from "../contexts/player";
import movieSearch from "../utils/movieSearch";
import urls from '../movieDB';


const BrowseContainer = ({ movies, randomMovie }) => {
  const [category, setCategory] = useState("films");
  const [rows, setRows] = useState(null);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  // show films or tv series
  useEffect(() => {
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
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

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
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
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
          <Card.Group>
            {Object.values(rows).map((rowItem, id) => (
              <Card key={`${rowItem.category}-${Math.random() * 1000}`}>
                <Card.Title>{rowItem.category}</Card.Title>
                <Card.Entities
                  rowItem={rowItem}
                  mainCategory={category}
                />
                <Card.Feature category={category}>
                  <Player>
                    <Player.Button />
                  </Player>
                </Card.Feature>
              </Card>
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
