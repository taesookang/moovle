import React, { createContext, useEffect, useState } from "react";

// Get initial state from local storage

const initialList = localStorage.getItem("watchlist")
  ? JSON.parse(localStorage.getItem("watchlist"))
  : [];

// Create watchlist context for global use
export const WatchlistContext = createContext();

// Provider component
export const WatchlistProvider = (props) => {
  const [watchlist, setWatchlist] = useState(initialList);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addMovieToWatchlist = (movie) => {
    setWatchlist([movie, ...watchlist]);
  };

  const removeMovieFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id));
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        setWatchlist,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};
