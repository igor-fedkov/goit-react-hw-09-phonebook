import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'nav-item-active';
export const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  color: blue;
  font-size: 1.1em;
  font-weight: 500;
  text-decoration: none;

  &.${activeClassName} {
    color: red;
  }

  & + & {
    margin-left: 20px;
  }
`;

export const NavigationEl = styled.div`
  
`;