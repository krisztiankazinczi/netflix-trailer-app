const API_KEY = "7e49e5b7c1a32369b80ba3620cf8e1d3";

const fetchingURLs = {
  categories_movie: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  categories_series: `/genre/tv/list?api_key=${API_KEY}&language=en-US`,
  discoverMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page={page}&with_genres={genre}`,
  discoverTVSeries: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page={page}&with_genres={genre}`,
  trending: `/trending/all/week?api_key=${API_KEY}`,
};

export default fetchingURLs;
