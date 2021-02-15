import React, { useState, useEffect } from 'react'
import { fetchMovies, fetchSearchedMovies, fetchGenre, fetchMovieByGenre } from '../context/Service'
import { MovieCard } from './MovieCard';
import { Genrelist, MoviesByGenre } from './Genres';

export const Movies = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [listByGenre, setListByGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            // setGenres(await fetchGenre());
            // setMovieByGenre(await fetchMovieByGenre());
            // setPersons(await fetchPersons());
            // setTopRated(await fetchTopratedMovie());
          };
      
          fetchAPI();
    },[])

    const toggleSelected = (genre_id) => {
        setSelectedGenre(genre_id)
        
    }
    const handleGenreClick = async (genre_id) => {
        toggleSelected(genre_id)
        {selectedGenre === genre_id ? (
            setListByGenre([])
        ):(
            setListByGenre(await fetchMovieByGenre(genre_id))
            )}

        console.log(selectedGenre, genre_id)
      };
    

    const onChange = async (e) => {
        e.preventDefault();

        setQuery(e.target.value);

        setResults(await fetchSearchedMovies(e.target.value)) 
    }

    return (
      <div className="movie-page">
        <div className="container">
          <div className="add-content">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Search for a movie"
                value={query}
                onChange={onChange}
              />
            </div>
            {results.length > 0 ? (
              <ul className="movie-grid search">
                {results.map((movie) => (
                  <li key={movie.id}>
                    <MovieCard movie={movie} type="addable" />
                  </li>
                ))}
              </ul>
            ) : (
              <>
                  <Genrelist handleGenreClick={handleGenreClick}/>
                  {listByGenre.length > 0? (
                    <MoviesByGenre listByGenre={listByGenre}/>
                  ) : (
                    <>
                      <h2> Now playing </h2>
                      <ul className="movie-grid now-playing">
                        {nowPlaying.map((movie) => (
                          <li key={movie.id}>
                            <MovieCard movie={movie} type="addable" />
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
         
            )}
          </div>
        </div>
      </div>
    );
}
