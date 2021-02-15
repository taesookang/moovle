import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const ResultCard = ({movie}) => {
    const { addMovieToWatchlist, addMovieToWatched, watchlist, watched } = useContext(GlobalContext);

    let storedMovie = watchlist.find(o => o.id === movie.id);
    let storedMovieWatched = watched.find(o => o.id === movie.id);

    const watchlistDisabled = storedMovie
      ? true
      : storedMovieWatched
      ? true
      : false;

    const watchedDisabled = storedMovieWatched ? true : false;

    return (
        <div className="result-card">
            <div className="poster-wrapper">
                {movie.poster ? (
                    <img src={poster} 
                    alt = {`${movie.title} Poster`}
                    />
                ): (
                    <div className="filler-poster"></div>
                )}
            </div>

            <div className="info">
                <div className="header">
                    <h3 className="title">{movie.title}</h3>
                    <h4 className="release-date">
                        {movie.release_date ? movie.release_date.substring(0,4) : "-"}
                    </h4>

                    <div className="controls">
                        <button 
                            className="btn"
                            disabled={watchlistDisabled}
                            onClick={()=> addMovieToWatchlist(movie)}
                        >
                            Add to Watchlist
                        </button>
                        <button 
                            className="btn"
                            disabled={watchedDisabled}
                            onClick={()=> addMovieToWatched(movie)}
                        >
                            Add to Watched
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
