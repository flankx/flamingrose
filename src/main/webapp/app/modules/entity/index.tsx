import React from 'react';

import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import VideoManagement from './video-management';
import VideoPlay from './video-play/video-play';
import Calculator from './calculator/calculator';

const EntityRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="video-management/*" element={<VideoManagement />} />
      <Route path="video-play" element={<VideoPlay />} />
      <Route path="calculator" element={<Calculator />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default EntityRoutes;
