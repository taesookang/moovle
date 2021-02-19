import React, { useState } from 'react'
import { fetchSearchedMovies } from '../context/Service'
import { MovieCard } from './MovieCard';
import{ Movielist } from "./Movielist";

export const Movies = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

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
                placeholder="Search movies"
                value={query}
                onChange={onChange}
              />
            </div>
            {query !== "" && (
              <h2 className="results-with">Results with "{query}"</h2>
            )}
            {results.length > 0 ? (
              <ul className="movie-grid search">
                {results.map((movie) => (
                  <li key={movie.id}>
                    <MovieCard movie={movie} type="addable" />
                  </li>
                ))}
              </ul>
            ) : query !== "" ? (
              <h1 className="no-results">No results found</h1>
            ) : (
              <Movielist/>
            )}
          </div>
        </div>
      </div>
    );
}
