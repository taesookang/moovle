import React from 'react'
import ReactPlayer from 'react-player'


export const VideoPlayer = (url) => {
    return (
      <div className="modal-video-wrapper">
          <ReactPlayer
            className="modal-video"
            controls="true"
            url={url}
            width="100%"
            height="100%"
          ></ReactPlayer>
      </div>
    );
}
