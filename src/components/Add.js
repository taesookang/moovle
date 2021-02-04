import React, { useState } from 'react'
import { MovieCard } from './MovieCard'

export const Add = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const onChange = (e) => {
        e.preventDefault();

        setQuery(e.target.value);

        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
            )
            .then((res) => res.json())
            .then((data)=>{
                if(!data.errors) {
                    setMovies(data.results);
                } else {
                    setMovies("")
                }
            });
    }

    return (
        <div className="add-page">
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
                    { movies.length > 0 && (
                        <ul className="movies">
                            {movies.map(movie => (
                                <li key={movie.id}>
                                    <MovieCard movie={movie}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}
