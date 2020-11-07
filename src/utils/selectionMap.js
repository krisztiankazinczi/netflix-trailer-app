import slugify from "slugify";
// TheMovieDb base url of images
const base_url = "https://image.tmdb.org/t/p/original/";

export default function selectionMap(movies) {
  return movies.map((movie) => {
    if (movie.backdrop_path || movie.poster_path) {
      const title = movie.title
        ? movie.title
        : movie.original_title
        ? movie.original_title
        : movie.original_name
        ? movie.original_name
        : "";

      return {
        id: movie.id,
        title,
        description: movie.overview,
        poster: movie.poster_path
          ? `${base_url}${movie.poster_path}`
          : movie.backdrop_path
          ? `${base_url}${movie.backdrop_path}`
          : "",
        poster_big: `${base_url}${movie.backdrop_path}`,
        release_date: movie.release_date,
        slug: slugify(title, { lower: true }),
      };
    }
  });
}
