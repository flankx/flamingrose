import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import VideoManagement from './video-management';
import VideoManagementDetail from './video-management-detail';
import VideoManagementUpdate from './video-management-update';
import VideoManagementDeleteDialog from './video-management-delete-dialog';

const VideoManagementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<VideoManagement />} />
    <Route path="new" element={<VideoManagementUpdate />} />
    <Route path=":id">
      <Route index element={<VideoManagementDetail />} />
      <Route path="edit" element={<VideoManagementUpdate />} />
      <Route path="delete" element={<VideoManagementDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default VideoManagementRoutes;
