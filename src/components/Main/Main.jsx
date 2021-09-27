import React, { useState, useContext } from "react";
import { QueryContext } from "../../context/QueryContext";
import Genres from "./Genres/Genres";
import Movielist from "./Movielist/Movielist";

export default function Main() {
  const { query } = useContext(QueryContext);
  const [selectedGenre, setSelectedGenre] = useState({
    id: 1,
    name: "Now Playing",
  });
  return (
    <div className="main">
      <div className="main__container">
        {query === "" ? (
          <Genres
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        ) : (
          <h2 className="query-result">
            Results with <span>"{query}"</span>
          </h2>
        )}
        <Movielist selectedGenre={selectedGenre} />
      </div>
    </div>
  );
}
