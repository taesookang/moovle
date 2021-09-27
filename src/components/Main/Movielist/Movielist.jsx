import React, { useState, useEffect, useContext } from "react";
import MovieCard from "../../shared/MovieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchMovieByGenre,
  fetchNowPlaying,
  fetchPopularMovies,
  fetchTopratedMovie,
  fetchSearchedMovies,
} from "../../../context/Service";
import { QueryContext } from "../../../context/QueryContext";
import NoResult from "./NoResult/NoResult";

export default function Movielist({ selectedGenre }) {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { query } = useContext(QueryContext);

  useEffect(() => {
    const fetchMovies = async () => {
      query !== ""
        ? setMovieList(await fetchSearchedMovies(query, 1))
        : setMovieList(await fetchList(selectedGenre.id, 1));
    };

    fetchMovies();
  }, [selectedGenre, query]);

  const fetchList = async (id, page) => {
    let list = [];
    switch (id) {
      case 1:
        list = await fetchNowPlaying(page);
        break;
      case 2:
        list = await fetchPopularMovies(page);
        break;
      case 3:
        list = await fetchTopratedMovie(page);
        break;
      default:
        list = await fetchMovieByGenre(id, page);
        break;
    }

    return list;
  };

  // console.log(movieList);

  const fetchMoreMovies = async (id, page) => {
    let moreMovies =
      query !== ""
        ? await fetchSearchedMovies(query, page)
        : await fetchList(id, page);
    setCurrentPage((prev) => prev + 1);
    setMovieList((prev) => [...prev, ...moreMovies]);
  };

  return movieList.length !== 0 ? (
    <InfiniteScroll
      className={"movielist"}
      dataLength={movieList.length}
      hasMore={true}
      next={() => fetchMoreMovies(selectedGenre.id, currentPage + 1)}
    >
      {movieList.map((movie) => (
        <MovieCard movieObj={movie} key={movie.id} />
      ))}
    </InfiniteScroll>
  ) : query !== "" && (
    <NoResult />
  );
}
