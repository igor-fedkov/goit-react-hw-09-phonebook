import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import routes from '../../routes';
import { authSelectors } from '../../redux';

import {StyledNavLink, NavigationEl} from './Navigation.css';

const Navigation = () => {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated)

  return (
    <NavigationEl>
      <StyledNavLink to={routes.home} exact>
        Главная
      </StyledNavLink>

      {isAuthenticated && <StyledNavLink to={routes.contacts} exact>
        Телефонная книга
      </StyledNavLink>}
    </NavigationEl>
  )
}

export default withRouter(Navigation);