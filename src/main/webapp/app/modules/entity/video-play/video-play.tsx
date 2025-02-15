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
    navigate(-1);
  };

  return <VideoModal showModal={showModal} handleClose={handleClose} type={state.type} code={state.code} url={state.url} />;
};

export default VideoPlay;
