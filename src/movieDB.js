const API_KEY = "7e49e5b7c1a32369b80ba3620cf8e1d3";

const fetchingURLs = {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  discover: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
};

export default fetchingURLs;
