import React, { useState } from 'react'
import { Genrelist, MoviesByGenre } from './Genrelist';
import { fetchMovieByGenre } from '../context/Service'
import { NowPlaying } from './NowPlaying';
import { TopRated } from './TopRated';
import { Popular } from './Popular';



export const Movielist = () => {
    const [listByGenre, setListByGenre] = useState([]);
    const [listType, setListType] = useState("now-playing");
    const [genreOpen, setGenreOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [pagesGenre, setPagesGenre] = useState(1);

    const onArrowClick = () => {
        setGenreOpen(prev => !prev)
        setSelectedGenre(null)
        setListByGenre([])
      }

    const handleGenreClick = async (genre_id) => {
      setSelectedGenre(genre_id);
      setPagesGenre(1);
      setListByGenre(await fetchMovieByGenre(genre_id, 1));
    };

    const fetchMoreMoviesByGenre = async (genre_id, pagesGenre) => {
      const moreMovies = await fetchMovieByGenre(genre_id, pagesGenre);
      setPagesGenre(prev => prev + 1);
      setListByGenre(prev => [...prev, ...moreMovies])
    };

    const list = [
      {
        title: "Now Playing",
        type: "now-playing",
      },
      {
        title: "Top Rated",
        type: "top-rated"
      },
      {
        title: "Popular",
        type: "popular"
      }
    ]

  return (
    <>
      <Genrelist
        genreOpen={genreOpen}
        onArrowClick={onArrowClick}
        handleGenreClick={handleGenreClick}
        selectedGenre={selectedGenre}
      />
      {listByGenre.length > 0 ? (
        <MoviesByGenre
          listByGenre={listByGenre}
          fetchMoreMoviesByGenre={fetchMoreMoviesByGenre}
          selectedGenre={selectedGenre}
          pagesGenre={pagesGenre}
        />
      ) : (
        <>
          <div className="lists-wrapper">
            {list.map((l) => (
              <button
              className={`btn-list ${l.type === listType && "active"}`}
              onClick={() => setListType(l.type)}
              key={l.type}
            >
              {l.title}
            </button>
            ))}
          </div>
          <ul>
            {listType === "now-playing" ? (
                <NowPlaying/>
            ) : listType==="top-rated" ? (
                <TopRated/>
            ):(
                <Popular/>
            )}
          </ul>
        </>
      )}
    </>
  );
};
