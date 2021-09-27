import axios from "axios";

const apiKey = process.env.REACT_APP_TMDB_KEY;
const url = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const searchUrl = `${url}/search/movie`;
const popularUrl = `${url}/movie/popular`;

const fetchNowPlaying = async (page) => {
  try {
    const { data } = await axios.get(nowPlayingUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });

    const movies = data.results;

    return movies;
  } catch (err) {
    return err;
  }
};

const fetchGenre = async () => {
  try {
    const { data } = await axios.get(genreUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: 1,
      },
    });
    const genres = data.genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));
    return genres;
  } catch (err) {
    return err;
  }
};

const fetchMovieByGenre = async (genre_id, page) => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
        with_genres: genre_id,
      },
    });
    const movies = data.results;

    return movies;
  } catch (err) {
    return err;
  }
};

const fetchTopratedMovie = async (page) => {
  try {
    const { data } = await axios.get(topratedUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });
    const movies = data.results;

    return movies;
  } catch (err) {
      return err;
  }
};

const fetchPopularMovies = async (page) => {
  try {
    const { data } = await axios.get(popularUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
      },
    });
    const movies = data.results;

    return movies;
  } catch (err) {
      return err
  }
};

const fetchMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
      params: {
        api_key: apiKey,
      },
    });

    return data.results[0];
  } catch (err) {
    return err;
  }
};

const fetchSearchedMovies = async (query, page) => {
  try {
    const { data } = await axios.get(searchUrl, {
      params: {
        api_key: apiKey,
        language: "en_US",
        page: page,
        query: query,
      },
    });

    const movies = data.results;

    return movies;
  } catch (err) {
    return err;
  }
};

export {
  fetchNowPlaying,
  fetchGenre,
  fetchMovieByGenre,
  fetchTopratedMovie,
  fetchMovieVideos,
  fetchSearchedMovies,
  fetchPopularMovies,
};
