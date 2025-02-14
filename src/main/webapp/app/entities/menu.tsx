import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

import { faWolfPackBattalion, faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
      <MenuItem icon={faFortAwesome as IconProp} to="/entity/video-management">
        <Translate contentKey="global.menu.entities.youtube">Meida Player</Translate>
      </MenuItem>
      <MenuItem icon={faCalculator as IconProp} to="/entity/calculator">
        <Translate contentKey="global.menu.entities.calculator">Calculator</Translate>
      </MenuItem>
    </>
  );
};

export default EntitiesMenu;
