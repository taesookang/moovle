import axios from 'axios';

const apiKey = process.env.REACT_APP_TMDB_KEY
const url = 'https://api.themoviedb.org/3';
const posterUrl = 'http://image.tmdb.org/t/p/w200';
const backdropUrl = 'http://image.tmdb.org/t/p/w780';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;
const searchUrl = `${url}/search/movie`;

// http://image.tmdb.org/t/p/w200/srYya1ZlI97Au4jUYAktDe3avyA.jpg


const fetchMovies = async () => { 
    try {
        const { data } = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })

        const movies = data.results
        
        return movies
        
    } catch (err) { return err }

}


const fetchGenre = async () => {
    try {
        const { data } = await axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const genres = data.genres.map((genre) => ({
            id: genre.id,
            name: genre.name
        }))
        return genres;

    } catch (err) { return err } 
}

const fetchMovieByGenre = async (genre_id) => {
    try {
        const { data } = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genre_id
            }
        })
        const movies = data.results;

        return movies;
    } catch (err) { return err }
}

const fetchPersons = async () => {
    try {
        const { data } = await axios.get(personUrl, {
            params: {
                api_key: apiKey
            }
        })
        const persons = data.results.map((person) => ({
            id: person.id,
            popularity: person.popularity,
            name: person.name,
            profileImg: posterUrl + person.profile_path,
            known: person.known_for_department
        }))
        return persons;
    } catch (err) { return err }
}

const fetchTopratedMovie = async () => {
    try {
        const { data } = await axios.get(topratedUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const movies = data.results.map((movie) => ({
            id: movie.id,
            backPoster: backdropUrl + movie.backdrop_path,
            popularity: movie.popularith,
            title: movie.title,
            poster: posterUrl + movie.poster_path,
            overview: movie.overview,
            rating: movie.vote_average
        }))

        return movies;
    } catch (error) {

    }
}

const fetchMovieDetail = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        return data;
    } catch (err) { return err }
}

const fetchMovieVideos = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey,
            }
        });
        return data.results[0];
    } catch (err) { return err }
}

const fetchCasts = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey,
            }
        });
        const casts = data.casts.map((cast) => ({
            id: cast.cast_id,
            character: cast.character,
            name: cast.name,
            img: posterUrl + cast.profile_path,
        }))

        return casts;
    } catch (err) { return err }
}

const fetchSimilarMovie = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });

        const movies = data.results.map((movie) => ({
            id: movie.id,
            backPoster: backdropUrl + movie.backdrop_path,
            popularity: movie.popularith,
            title: movie.title,
            poster: posterUrl + movie.poster_path,
            overview: movie.overview,
            rating: movie.vote_average
        }))

        return movies;
    } catch (err) { return err }
}

const fetchSearchedMovies = async (query) => {
    try {
        const { data } = await axios.get(searchUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                query: query
            }
        })

        console.log(query)


        const movies = data.results

        return movies;
    } catch (err) { return err }

} 




export {
    fetchMovies, 
    fetchGenre,
    fetchMovieByGenre,
    fetchPersons,
    fetchTopratedMovie,
    fetchMovieDetail,
    fetchMovieVideos,
    fetchCasts,
    fetchSimilarMovie,
    fetchSearchedMovies
}