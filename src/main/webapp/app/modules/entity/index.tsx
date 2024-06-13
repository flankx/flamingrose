import React from 'react';

import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import VideoManagement from './video-management';
import PlayerManagement from './player-management';
import VideoPlay from './video-play/video-play';

const EntityRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="video-management/*" element={<VideoManagement />} />
      <Route path="player-management/*" element={<PlayerManagement />} />
      <Route path="video-play" element={<VideoPlay />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default EntityRoutes;
