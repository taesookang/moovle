import React, { useContext } from "react";
import { WatchlistContext } from "../../context/WatchlistContext";
import MovieCard from '../shared/MovieCard/MovieCard'

export default function Watchlist() {
  const { watchlist } = useContext(WatchlistContext);


  return (
    <div className="watchlist">
      <div className="watchlist__label">
        <h2>My Watchlist</h2>
        <p> You have {watchlist.length} {`${watchlist.length > 1 ? 'movies': 'movie'}`} to watch</p>
      </div>
      <div className="watchlist__container">
        <div className="watchlist__list">
          {
            watchlist.map((movie) => (
              <MovieCard movieObj={movie} key={movie.id}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}
