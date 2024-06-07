import React from 'react';

import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import VideoManagement from './video-management';
import PlayerManagement from './player-management';

const EntityRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="video-management/*" element={<VideoManagement />} />
      <Route path="player-management/*" element={<PlayerManagement />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default EntityRoutes;
