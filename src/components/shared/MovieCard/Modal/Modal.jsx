import React, { useState, useEffect, useRef, useContext } from "react";
import { CgClose, CgHeart } from "react-icons/cg";
import { FaStar, FaVideoSlash } from "react-icons/fa";
import { fetchMovieVideos } from "../../../../context/Service";
import ReactPlayer from "react-player";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import { WatchlistContext } from "../../../../context/WatchlistContext";

export default function Modal({ movie, setModalOpen, movieObj }) {
  const youtubeUrl = "https://www.youtube.com/embed/";
  const backdropUrl = "https://image.tmdb.org/t/p/w780/";
  const { addMovieToWatchlist, removeMovieFromWatchlist, watchlist } =
    useContext(WatchlistContext);

  const [video, setVideo] = useState("");
  const [inList, setInList] = useState(false);
  const backdrop = movie.backdrop !== null && backdropUrl + movie.backdrop;
  let storedMovie = watchlist.find((o) => o.id === movie.id);

  useEffect(() => {
    const fetchVideo = async () => {
      const videoURL = await fetchMovieVideos(movie.id);

      videoURL !== undefined && setVideo(youtubeUrl + videoURL.key);
    };

    fetchVideo();
    storedMovie && setInList(true);
  }, [movie.id, storedMovie]);

  const ref = useRef();

  useOutsideClick(ref, () => {
    setModalOpen(false);
  });

  console.log(movie);

  const handleLikes = () => {
    inList ? removeMovieFromWatchlist(movie.id) : addMovieToWatchlist(movieObj);
    setInList((prev) => !prev);
  };

  return (
    <div className="modal" ref={ref}>
      <CgClose className="modal__close" onClick={() => setModalOpen(false)} />
      <div className="modal__container">
        <div className="modal__video">
          {/* if video has null value => place backdrop image instead */}
          {/* if both video and backdrop image aren't available => render dummy image with a message */}
          {video !== "" ? (
            <ReactPlayer
              className="video"
              url={video}
              onPlay={() => {}}
              playing={true}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    controls: 1,
                    iv_load_policy: 3,
                  },
                },
              }}
            ></ReactPlayer>
          ) : backdrop ? (
            <>
              <img
                className="filler-video"
                src={backdrop}
                style={{ width: "100%", height: "auto" }}
                alt=""
              />
            </>
          ) : (
            <div className="no-video">
              <FaVideoSlash />
              <h3> No trailer available </h3>
            </div>
          )}
        </div>
        <div className="modal__content">
          <div className="content">
            <div className="title">{movie.title}</div>
            <div className="info">
              {movie.release !== "" && (
                <div className="release">{movie.release}</div>
              )}
              {movie.rate !== 0 && (
                <div className="rate">
                  <FaStar />
                  {movie.rate.toFixed(1)}
                </div>
              )}
            </div>
            <div className="line" />
            <div className="overview">{movie.overview}</div>
          </div>
          <div className="add-btn">
            <button className={inList ? "in-list" : undefined} onClick={handleLikes}>
              <CgHeart />
              <span>
                {inList ? "Remove from Watchlist" : "Add to Watchlist"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
