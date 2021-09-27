import React, { useState, useEffect } from "react";
import { fetchGenre } from "../../../context/Service";
import { IoChevronDown } from "react-icons/io5";

export default function Genres({ selectedGenre, setSelectedGenre }) {
  const [genres, setGenres] = useState([
    { id: 1, name: "Now Playing" },
    { id: 2, name: "Popular" },
    { id: 3, name: "Top Rated" },
  ]);
  const [genreOpen, setGenreOpen] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const list = await fetchGenre();
      setGenres((genres) => [...genres, ...list]);
    };
    fetchAPI();
  }, []);

  return (
    <div className="genres">
      <div className="genres__menu">
        <span>{selectedGenre.name}</span>
        <IoChevronDown
          onClick={() => setGenreOpen((prev) => !prev)}
          className={`genres__button ${genreOpen && "open"}`}
        />
      </div>
      <div className={`genres__container ${genreOpen && "open"}`}>
        <GenreList
          genres={genres}
          setGenreOpen={setGenreOpen}
          setSelectedGenre={setSelectedGenre}
          genreOpen={genreOpen}
        />
      </div>
    </div>
  );
}

function GenreList({ genres, genreOpen, setGenreOpen, setSelectedGenre }) {
  const handleGenreClick = (genre) => {
    setGenreOpen(false);
    setSelectedGenre(genre);
  };

  return (
    <div className="genrelist">
      {genres.map((genre) => (
        <div
          className={`genre ${genreOpen && "open"}`}
          key={genre.id}
          onClick={() => handleGenreClick(genre)}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
}
