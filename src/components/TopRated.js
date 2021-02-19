import React, { useState, useEffect } from 'react';
import { fetchTopratedMovie } from '../context/Service';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MovieCard } from './MovieCard';

export const TopRated = () => {
    const [topRated, setTopRated] = useState([]);
    const [pagesToprated, setPagesToprated] = useState(1);



    useEffect(() => {
        const fetchAPI = async () => {
            setTopRated(await fetchTopratedMovie(1));
          };
      
          fetchAPI();

    },[])

    const fetchTopRatedMore = async (pagesToprated) => {
        const moreMovies = await fetchTopratedMovie(pagesToprated);
        setPagesToprated(prev => prev + 1)
        setTopRated(prev=>[...prev, ...moreMovies])
  
        return console.log(moreMovies);
    }

    return (
      <>
        <InfiniteScroll
          className={"movie-grid"}
          dataLength={topRated.length}
          hasMore={true}
          next={() => fetchTopRatedMore(pagesToprated + 1)}
          loader={<div className="loader"></div>}
        >
          {topRated.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} type="addable" />
            </li>
          ))}
        </InfiniteScroll>
      </>
    );
}
