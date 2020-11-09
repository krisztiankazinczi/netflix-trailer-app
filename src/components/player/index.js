import React from "react";
import ReactDOM from "react-dom";
import { Container, Button, Overlay, Inner, Close } from "./styles/player";
import { usePlayerState } from "../../contexts/player";

import YouTube from "react-youtube";

const opts = {
  height: "700",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};


export default function Player({ children, ...restProps }) {
  return (
      <Container {...restProps}>{children}</Container>
  );
}

Player.Video = function PlayerVideo({ 
  ...restProps
}) {
  const {
    showPlayer,
    setShowPlayer,
    trailerUrl,
    setSelectedMovieTitle,
  } = usePlayerState();

  const closeYoutubeTrailer = () => {
    setShowPlayer(false);
    setSelectedMovieTitle("");
  };

  return showPlayer
    ? ReactDOM.createPortal(
        <Overlay onClick={closeYoutubeTrailer} data-testid="player">
          <Inner>
            {showPlayer && <YouTube videoId={trailerUrl} opts={opts} />}
            <Close />
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { setShowPlayer, selectedMovieTitle } = usePlayerState();

  const handleClick = (title) => {
      setShowPlayer((showPlayer) => !showPlayer);
  }

  return (
    <Button
      onClick={() => handleClick(selectedMovieTitle)}
      {...restProps}>
      Play
    </Button>
  );
};
