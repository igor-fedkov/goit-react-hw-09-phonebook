import { useSelector } from 'react-redux';

import { authSelectors } from '../../redux';

import { Navigation, AuthNav, UserMenu } from '../';

import { Header } from './AppBar.css';

const AppBar = () => {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <Header>
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </Header>
  )
}

export default AppBar;