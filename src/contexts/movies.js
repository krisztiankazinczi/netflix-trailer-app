import React, { createContext, useReducer, useContext } from "react";

const MoviesStateContext = createContext();
const MoviesDispatchContext = createContext();

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.mainCategory]: action.payload.data,
        },
      };

    case "GET_TRENDING":
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload.mainCategory]: action.payload.data,
        },
      };

    case "ADD_MOVIES_TO_CATEGORY":
      if (
        state.movies[action.payload.mainCategory] !== null &&
        state.movies?.[action.payload.mainCategory]?.[action.payload.category]
      ) {
        // if category already exists, just add the new movies to that list
        return {
          ...state,
          movies: {
            ...state.movies,
            [action.payload.mainCategory]: {
              ...state.movies[action.payload.mainCategory],
              [action.payload.category]: {
                ...state.movies[action.payload.mainCategory][
                  action.payload.category
                ],
                page: (state.movies[action.payload.mainCategory][
                  action.payload.category
                ].page += 1),
                data: [
                  ...state.movies[action.payload.mainCategory][
                    action.payload.category
                  ].data,
                  ...action.payload.data,
                ],
              },
            },
          },
        };
      }
      // if it's a new category, the category will be created with the fetched films
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload.mainCategory]: {
            ...state.movies[action.payload.mainCategory],
            [action.payload.category]: {
              page: 1,
              data: action.payload.data,
              category: action.payload.category,
            },
          },
        },
      };

    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
};

export const MoviesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, {
    movies: {
      films: null,
      series: null,
    },
    categories: null,
  });

  return (
    <MoviesDispatchContext.Provider value={dispatch}>
      <MoviesStateContext.Provider value={state}>
        {children}
      </MoviesStateContext.Provider>
    </MoviesDispatchContext.Provider>
  );
};

export const useMoviesState = () => useContext(MoviesStateContext);
export const useMoviesDispatch = () => useContext(MoviesDispatchContext);
