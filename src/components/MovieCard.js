import React from 'react'
import { MovieControls } from './MovieControls'

export const MovieCard = ({ movie, type }) => {
    return (
        <div className="watchlist-card">
            <div className="overlay"></div>

            {movie.poster_path ? (
                    <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                    alt = {`${movie.title} Poster`}
                    />
                ): (
                    <div className="filler-poster"></div>
                )}

            <MovieControls type={type} movie={movie} />
        </div>
    )
}
