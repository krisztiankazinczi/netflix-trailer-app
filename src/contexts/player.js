import React, { useState, createContext, useReducer, useContext } from "react";

const PlayerStateContext = createContext();
// const PlayerDispatchContext = createContext();

// const playerReducer = (state, action) => {
//   switch (action.type) {
//     case "SHOW_PLAYER":
//       return {
//         ...state,
//         showPlayer: true,
//       };

//     case "HIDE_PLAYER":
//       return {
//         ...state,
//         showPlayer: false,
//       };

//     case "SET_SELECTED_MOVIE_TITLE":
//       return {
//         ...state,
//         title: action.title,
//       };

//     default:
//       return {
//         ...state,
//       };
//   }
// };

export const PlayerProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(playerReducer, {
  //   showPlayer: false,
  //   title: ""
  // });
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("Avengers");

  return (
    <PlayerStateContext.Provider
      value={{
        showPlayer,
        setShowPlayer,
        trailerUrl,
        setTrailerUrl,
        selectedMovieTitle,
        setSelectedMovieTitle,
      }}>
      {children}
    </PlayerStateContext.Provider>
  );
};

export const usePlayerState = () => useContext(PlayerStateContext);
// export const usePlayerDispatch = () => useContext(PlayerDispatchContext);
