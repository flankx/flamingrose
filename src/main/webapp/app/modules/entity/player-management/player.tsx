import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import VideoPopup from './popup';

import { useAppSelector } from 'app/config/store';

const videoArray = [
  { name: 'video 1', url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },
  { name: 'video 2', url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },
];

const mapUrl = videoArray.map((element, index) => (
  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
    <VideoPopup poster="/content/images/player_poster.png" videoUrl={element.url} />
  </li>
));

export const PlayerPage = () => {
  return <ul className="list-group">{mapUrl}</ul>;
};

export default PlayerPage;
