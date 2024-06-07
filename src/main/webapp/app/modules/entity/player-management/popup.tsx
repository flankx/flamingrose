import React, { useEffect, useState } from 'react';
import { Player } from 'video-react';
import { Translate } from 'react-jhipster';
import 'video-react/dist/video-react.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VideoPopup = ({ poster, videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <strong>{videoUrl}</strong>
      <button title="play" type="button" className="btn btn-secondary" onClick={openModal}>
        <FontAwesomeIcon icon="play" />
      </button>
      <button title="xmark" type="button" className="btn btn-secondary" onClick={closeModal}>
        <FontAwesomeIcon icon="xmark" />
      </button>
      {isOpen && <Player poster={poster} src={videoUrl} autoPlay />}
    </div>
  );
};

export default VideoPopup;
