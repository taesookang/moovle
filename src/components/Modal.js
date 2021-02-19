import React from 'react'
import ReactPlayer from 'react-player'
import { MovieControls } from './MovieControls'

export const Modal = ({popupActive, handleOnPlay, isPlaying, video, movie, type}) => {
    const youtubeUrl = "https://www.youtube.com/embed/";
    const backdropUrl = 'http://image.tmdb.org/t/p/w780'; 

    const backdrop = backdropUrl + movie.backdrop_path;
    

    return (
        <div className={`modal ${popupActive && 'active'}`} >
            <div className="modal-content">
                <div className="modal-video-wrapper">
                    {video ? (<ReactPlayer 
                        className='modal-video' 
                        url={youtubeUrl + video.key}
                        onPlay={handleOnPlay}
                        playing={isPlaying}
                        width="100%"
                        height="100%"
                        config={
                            {youtube: {
                                playerVars:{
                                    controls: 1,
                                    iv_load_policy: 3
                                }
                            }}
                        }
                        ></ReactPlayer>) : ! backdrop.includes("null") ? (
                        <img className="filler-video" src={backdrop} alt=""/>):(
                            <div className="no-video">
                                <i className="fas fa-video-slash"></i>
                                <h3> No trailer available </h3>
                            </div>
                        ) }
                </div>
                
                <div className="modal-info">
                    <div className="modal-header">
                        <h2 className="modal-title">{movie.title}</h2>
                        <div className="release-rates">
                            <span className="release">{`Release date: ${movie.release_date} `}</span>
                            <div className="rates">
                                <i className="fas fa-star"></i> 
                                <span>{movie.vote_average ? (`${movie.vote_average} / 10`): ("- -")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="overview-wrapper">
                        <p className="overview">{movie.overview}</p> 
                    </div>
                </div>

                <MovieControls type={type} movie={movie} />
            </div>
            <div className="close">
                <span>&times;</span>
            </div>
        </div>
    )
}
