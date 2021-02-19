import React, { useState, useRef } from 'react'
import useOutsideClick from "./hooks/useOutsideClick"
import { fetchMovieVideos } from "../context/Service"
import { Modal } from "./Modal"
import logo from "../images/logo.png"

export const MovieCard = ({ movie, type }) => {
    const posterUrl = 'https://image.tmdb.org/t/p/w200';
    const poster =  posterUrl + movie.poster_path;
    
    const [popupActive, setPopupActive] = useState(false);
    const [video, setVideo] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    const ref = useRef()

    useOutsideClick(ref, ()=>{
        if (popupActive === true){
            setPopupActive(!popupActive)
            setIsPlaying(false)
        }
    })

    const handleOnPlay = () => {
        setIsPlaying(true)
    }
    
    const onPopupClick = async () => {
        const closeBtn = document.querySelector(".close")
        closeBtn.addEventListener("click", () => {
            setPopupActive(false);
            setIsPlaying(false)
            })
        setPopupActive(true);
        setVideo(await fetchMovieVideos(movie.id));
        }
    
    return (
        <>
        <div className="movie-card" onClick={onPopupClick} ref={ref}>
            <div className="overlay"></div>
            <>
                <div className="poster-wrapper">
                    { !poster.includes("null") ? (
                            <img src={poster} 
                            alt = {`${movie.title} Poster`}/>
                    ): (

                        <div className="filler-poster">
                            <img src={logo} alt="filler"/>
                        </div>
                    )}
                </div>
                <div className="movie-title">
                        <h3>{movie.title}</h3>
                        <h4>{movie.release_date ? movie.release_date.substring(0,4) : "-"}</h4>
                </div>
            </>
        </div>
        <Modal 
            popupActive={popupActive}
            handleOnPlay={handleOnPlay} 
            isPlaying={isPlaying}
            video={video} 
            movie={movie} 
            type={type}
        />
        </>
    )
}
