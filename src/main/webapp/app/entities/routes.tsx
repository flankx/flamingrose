import React from 'react';
import { Route } from 'react-router-dom';
import PlayerPage from 'app/modules/entity/player';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
        <Route path="player" element={<PlayerPage />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};
