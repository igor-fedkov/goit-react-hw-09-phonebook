import { withRouter } from 'react-router-dom';

import routes from '../../routes';

import { StyledNavLink, AuthNavEl } from './AuthNav.css';

const AuthNav = () => {
  return (
    <AuthNavEl>
      <StyledNavLink to={routes.registration} exact>
        Регистрация
      </StyledNavLink>

      <StyledNavLink to={routes.login} exact>
        Логин
      </StyledNavLink>
    </AuthNavEl>
  )
}

export default withRouter(AuthNav);