import React, { useState, useContext, createContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Overlay, Inner, Close } from "./styles/player";
import { PlayerProvider, usePlayerState } from "../../contexts/player";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

// export const PlayerContext = createContext();

// export default function Player({ children, ...restProps }) {
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [trailerUrl, setTrailerUrl] = useState("");

//   return (
//     <PlayerContext.Provider
//       value={{ showPlayer, setShowPlayer, trailerUrl, setTrailerUrl }}>
//       <Container {...restProps}>{children}</Container>
//     </PlayerContext.Provider>
//   );
// }

export default function Player({ children, ...restProps }) {
  return (
    <PlayerProvider>
      <Container {...restProps}>{children}</Container>
    </PlayerProvider>
  );
}

Player.Video = function PlayerVideo({
  src,
  // title,
  // setSelectedMovieTitle,
  ...restProps
}) {
  // const { showPlayer, setShowPlayer, trailerUrl, setTrailerUrl } = useContext(
  //   PlayerContext
  // );
  const {
    showPlayer,
    setShowPlayer,
    trailerUrl,
    setTrailerUrl,
    selectedMovieTitle,
    setSelectedMovieTitle,
  } = usePlayerState();

  useEffect(() => {
    console.log(selectedMovieTitle);
    const title = selectedMovieTitle;
    movieTrailer(title)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        console.log(urlParams.get("v"));
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((err) => {
        console.log(err);
        setTrailerUrl("");
      });
  }, [selectedMovieTitle]);

  const closeYoutubeTrailer = () => {
    setShowPlayer(false);
    setSelectedMovieTitle("");
  };

  return showPlayer
    ? ReactDOM.createPortal(
        <Overlay onClick={closeYoutubeTrailer} data-testid="player">
          <Inner>
            {/* <video id="netflix-player" controls>
              <source src={src} type="video/mp4" />
            </video> */}
            {showPlayer && <YouTube videoId={trailerUrl} opts={opts} />}
            <Close />
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { showPlayer, setShowPlayer } = usePlayerState();

  return (
    <Button
      onClick={() => setShowPlayer((showPlayer) => !showPlayer)}
      {...restProps}>
      Play
    </Button>
  );
};
