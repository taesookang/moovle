import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const MovieControls = ({movie, type}) => {
    const { addMovieToWatchlist,
        addMovieToWatched,
        watchlist,
        watched,
        moveToWatchlist,
        removeMovieFromWatchlist,
        removeFromWatched
    } = useContext(GlobalContext);

    let storedMovie = watchlist.find(o => o.id === movie.id);
    let storedMovieWatched = watched.find(o => o.id === movie.id);

    const watchlistDisabled = storedMovie
      ? true
      : storedMovieWatched
      ? true
      : false;

    const watchedDisabled = storedMovieWatched ? true : false;   

    return (
      <div className="inner-card-controls">
        {type === "watchlist" && (
          <div className="ctrl-btns">
            <button
              className="ctrl-btn"
              onClick={() => addMovieToWatched(movie)}
            >
              <i className="fa-fw far fa-eye"></i>
              Watched
            </button>

            <button
              className="ctrl-btn delete"
              onClick={() => removeMovieFromWatchlist(movie.id)}
            >
              <i className="fa-fw fa fa-times"></i>
                Delete
            </button>
          </div>
        )}

        {type === "watched" && (
          <div className="ctrl-btns">
            <button 
                className="ctrl-btn"
                onClick={()=> moveToWatchlist(movie)}
            >
              <i className="fa-fw far fa-eye-slash"></i>
                Watchlist
            </button>

            <button
              className="ctrl-btn delete"
              onClick={() => removeFromWatched(movie.id)}
            >
              <i className="fa-fw fa fa-times"></i>
                Delete
            </button>
          </div>

          
        )}

        {type === "addable" && (
          <div className="ctrl-btns">
            <button 
                className="ctrl-btn"
                disabled={watchlistDisabled}
                onClick={()=> addMovieToWatchlist(movie)}
            >
                <i className="fas fa-plus"></i>
                Watchlist
            </button>
            <button 
                className="ctrl-btn"
                disabled={watchedDisabled}
                onClick={()=> addMovieToWatched(movie)}
            >
                <i className="fa-fw far fa-eye"></i>
                Watched
            </button>
          </div>

          
        )}


      </div>
    );
}
