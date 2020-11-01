import slugify from "slugify";
// TheMovieDb base url of images
const base_url = "https://image.tmdb.org/t/p/original/";

export default function selectionMap(movies) {
  return movies.map((movie) => {
    if (movie.backdrop_path || movie.poster_path) {
      return {
        id: movie.id,
        title: movie.title
          ? movie.title
          : movie.original_title
          ? movie.original_title
          : "",
        description: movie.overview,
        poster: movie.backdrop_path
          ? `${base_url}${movie.backdrop_path}`
          : movie.poster_path
          ? `${base_url}${movie.poster_path}`
          : "",
        release_date: movie.release_date,
        slug: movie.title
          ? slugify(movie.title, { lower: true })
          : movie.original_title
          ? slugify(movie.original_title, { lower: true })
          : "",
      };
    }
  });
}
