import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../context/Service';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MovieCard } from './MovieCard';



export const NowPlaying = () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [pagesNowPlaying, setPagesNowPlaying] = useState(1);

    useEffect(() => {
        const fetchAPI = async () => {
          setNowPlaying(await fetchMovies(1));
        };

        fetchAPI();

    },[])


    const fetchNowPlayingMore = async (pagesNowPlaying) => {
        const moreMovies = await fetchMovies(pagesNowPlaying);
        setPagesNowPlaying(prev => prev + 1)
        setNowPlaying(prev=>[...prev, ...moreMovies])
    }

    return (
      <>
        <InfiniteScroll
          className={"movie-grid"}
          dataLength={nowPlaying.length}
          hasMore={true}
          next={() => fetchNowPlayingMore(pagesNowPlaying + 1)}
          loader={<div className="loader"></div>}
        >
          {nowPlaying.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} type="addable" />
            </li>
          ))}
        </InfiniteScroll>
      </>
    );
}
