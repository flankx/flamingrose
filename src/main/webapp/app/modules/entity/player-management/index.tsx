import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PlayerPage from './player';

const PlayerManagementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PlayerPage />} />
  </ErrorBoundaryRoutes>
);

export default PlayerManagementRoutes;
