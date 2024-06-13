import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

import { faWolfPackBattalion, faFortAwesome } from '@fortawesome/free-brands-svg-icons';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
      <MenuItem icon={faWolfPackBattalion} to="/entity/player-management">
        <Translate contentKey="global.menu.entities.player">H5 Player</Translate>
      </MenuItem>
      <MenuItem icon={faFortAwesome} to="/entity/video-management">
        <Translate contentKey="global.menu.entities.youtube">Meida Player</Translate>
      </MenuItem>
    </>
  );
};

export default EntitiesMenu;
