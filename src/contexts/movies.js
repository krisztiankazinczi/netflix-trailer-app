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

    case "LOADING_MOVIES_DATA":
      return {
        ...state,
        loadingMovies: action.payload.loading
      }

    // case "ADD_ALL_MOVIES":
    //   return {
    //     ...state,

    //   }

    case "ADD_MOVIES_TO_CATEGORY":
      const { mainCategory, category, data } = action.payload;

      if (
        state.movies[mainCategory] !== null &&
        state.movies?.[mainCategory]?.[category]
      ) {
        // if category already exists, just add the new movies to that list
        return {
          ...state,
          movies: {
            ...state.movies,
            [mainCategory]: {
              ...state.movies[mainCategory],
              [category]: {
                ...state.movies[mainCategory][
                  category
                ],
                page: (state.movies[mainCategory][
                  category
                ].page += 1),
                data: [
                  ...state.movies[mainCategory][
                    category
                  ].data,
                  ...data,
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
          [mainCategory]: {
            ...state.movies[mainCategory],
            [category]: {
              page: 1,
              data: data,
              category: category,
            },
          },
        },
      };

    case "DELETE_EVERY_MOVIES":
      return {
        ...state,
        movies: {
          films: null,
          series: null
        }
      }

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
    loadingMovies: false
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
