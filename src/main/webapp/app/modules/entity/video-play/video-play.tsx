import React, { useEffect, useState } from 'react';
import VideoModal from './video-modal';
import { useLocation, useNavigate } from 'react-router';

export const VideoPlay = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    navigate('/entity/video-management');
  };

  return <VideoModal showModal={showModal} handleClose={handleClose} url={state.url} />;
};

export default VideoPlay;
