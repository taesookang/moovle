import React, { useState, useEffect } from 'react'
import { fetchGenre } from '../context/Service'
import { MovieCard } from './MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Genrelist = ({handleGenreClick, selectedGenre, onArrowClick, genreOpen}) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setGenres(await fetchGenre());
          };

          fetchAPI();
    },[])

    return (
        <div className={`genres ${genreOpen && 'active'}`}>
          <div className="genres-header" onClick={onArrowClick}>
            <span>Genres</span>
            <i className={`fas fa-chevron-${genreOpen ? 'up' : 'down'} genres-toggle`}></i>
          </div>
            <ul>
            {genres.map((genre) => (
                <li key={genre.id}>
                <button 
                className={`genre-btn ${selectedGenre === genre.id && 'selected'}`}
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

export const MoviesByGenre = ({listByGenre, fetchMoreMoviesByGenre, selectedGenre, pagesGenre}) => {
 
    return (
      <InfiniteScroll
        className={"movie-grid by-genre"}
        dataLength={listByGenre.length}
        hasMore={true}
        next={() => fetchMoreMoviesByGenre(selectedGenre, pagesGenre + 1)}
        loader={
          <div className="loader"></div>
        }
      >
        {listByGenre.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} type="addable" />
          </li>
        ))}
      </InfiniteScroll>
    );
}