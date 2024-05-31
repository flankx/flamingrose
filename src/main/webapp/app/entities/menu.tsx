import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
      <MenuItem icon="video" to="/entity/player">
        <Translate contentKey="global.menu.entities.player">H5 Player</Translate>
      </MenuItem>
    </>
  );
};

export default EntitiesMenu;
