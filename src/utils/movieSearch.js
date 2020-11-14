const movieSearch = (categories, searchTerm) => {
    const filteredMovies = {};

    Object.entries(categories).forEach(([cat, movies]) => {

      movies.data.forEach(movie => {
        if (
          movie?.description.toLowerCase().includes(searchTerm)
          || 
          movie?.title.toLowerCase().includes(searchTerm)
        ) {
          if (!filteredMovies[cat]) {
            filteredMovies[cat] = {
              ...movies,
              data: [movie]
            }
          } else {
            filteredMovies[cat].data = [
              ...filteredMovies[cat].data,
              movie
            ]
          }
        }
      });

    });

    return filteredMovies;
}

export default movieSearch;