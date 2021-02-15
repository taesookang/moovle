import React, { useState, useEffect } from 'react'
import { fetchGenre } from '../context/Service'
import { MovieCard } from './MovieCard';

export const Genrelist = ({handleGenreClick}) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setGenres(await fetchGenre());
          };
      
          fetchAPI();
    },[])

    return (
        <div className="genres">
            <ul>
            {genres.map((genre) => (
                <li key={genre.id}>
                <button 
                className="genre-btn"
                onClick={() => handleGenreClick(genre.id)}
                >
                    {genre.name}
                </button>
                </li>
            ))}
            </ul>
        </div>
    )
}

export const MoviesByGenre = ({listByGenre}) => {
    return (
      <ul className="movie-grid by-genre">
        <>
          {listByGenre.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} type="addable" />
            </li>
          ))}
        </>
      </ul>
    );
}