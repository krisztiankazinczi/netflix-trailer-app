import React, { useState, createContext, useContext, useEffect } from "react";
import movieTrailer from "movie-trailer";


const PlayerStateContext = createContext();

export const PlayerProvider = ({ children }) => {

  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("Avengers");

  useEffect(() => {

    movieTrailer(selectedMovieTitle)
    .then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
    })
    .catch((err) => console.log(err));

  }, [selectedMovieTitle])

  return (
    <PlayerStateContext.Provider
      value={{
        showPlayer,
        setShowPlayer,
        trailerUrl,
        selectedMovieTitle,
        setSelectedMovieTitle,
      }}>
      {children}
    </PlayerStateContext.Provider>
  );
};

export const usePlayerState = () => useContext(PlayerStateContext);
