import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/training">
      Training
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/training-record">
      Training Record
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/payment-record">
      Payment Record
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/member">
      Member
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/skill">
      Skill
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
