import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";

export default function MovieCard({ movieObj }) {
  const [modalOpen, setModalOpen] = useState(false);
  const movie = {
    id: movieObj.id,
    title: movieObj.title,
    release: movieObj.release_date,
    overview: movieObj.overview,
    poster: movieObj.poster_path,
    rate: movieObj.vote_average,
    rateCount: movieObj.vote_count,
    backdrop: movieObj.backdrop_path
  };
  const posterUrl = "https://image.tmdb.org/t/p/w200";
  const poster = posterUrl + movie.poster;

  useEffect(() => {
    modalOpen ? disableScroll() : enableScroll();
  }, [modalOpen])


  // Disable scroll when modal is open.
  // reference >> https://www.geeksforgeeks.org/how-to-disable-scrolling-temporarily-using-javascript/
  
  function disableScroll() {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    window.onscroll = function () {};
  }



  return (
    <>
      <div className="card">
        <div
          className={`card__poster ${movie.poster === null && "notfound"}`}
          onClick={() => setModalOpen((prev) => !prev)}
        >
          <img src={movie.poster !== null ? poster : `${process.env.PUBLIC_URL + '/images/logo.png'}`} alt="" />
        </div>
        <div className="card__title">{movie.title}</div>
        <div className="card__release">
          {movie.release ? movie.release.substring(0, 4) : "-"}
        </div>
      </div>
      {modalOpen && (
        <Modal
          movie={movie}
          setModalOpen={setModalOpen}
          movieObj={movieObj}
        />
      )}
    </>
  );
}
