import React from 'react';
import { Translate } from 'react-jhipster';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

import { useAppSelector } from 'app/config/store';

export const PlayerPage = () => {
  return <Player playsInline poster="/content/images/player_poster.png" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />;
};

export default PlayerPage;
