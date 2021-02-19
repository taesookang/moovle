import React, { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../context/Service';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MovieCard } from './MovieCard';

export const Popular = () => {
    const [popular, setPopular] = useState([]);
    const [pages, setPages] = useState(1);



    useEffect(() => {
        const fetchAPI = async () => {
            setPopular(await fetchPopularMovies(1));
          };
      
          fetchAPI();

    },[])

    const fetchPopularMore = async (pages) => {
        const moreMovies = await fetchPopularMovies(pages);
        setPages(prev => prev + 1)
        setPopular(prev=>[...prev, ...moreMovies])
  
        return console.log(moreMovies);
    }

    return (
      <>
        <InfiniteScroll
          className={"movie-grid"}
          dataLength={popular.length}
          hasMore={true}
          next={() => fetchPopularMore(pages + 1)}
          loader={<div className="loader"></div>}
        >
          {popular.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} type="addable" />
            </li>
          ))}
        </InfiniteScroll>
      </>
    );
}
