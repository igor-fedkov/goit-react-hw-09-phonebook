import { Redirect, Route, Switch } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from "react-transition-group";

import { authOperations, authSelectors, globalDataSelectors } from './redux';

import routes from './routes';
import { PrivatRoute, PublicRoute } from './components/Routes';

import { AppBar, LoaderSpinner, Notification } from './components';

import { Container } from './App.css';

const PhoneBookView = lazy(() => import('./views/PhoneBookView'));
const LoginView = lazy(() => import('./views/LoginView'));
const RegistrationView = lazy(() => import('./views/RegistrationView'));
const HomeView = lazy(() => import('./views/HomeView'));


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);
  
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  const errorText = useSelector(globalDataSelectors.getErrorText);
  const token = useState(authSelectors.getToken);

  return (
    <Container>
      <AppBar />
      <CSSTransition
        in={!!errorText}
        appear={true}
        classNames="fade"
        timeout={250}
        unmountOnExit
      >					
        <Notification />
      </CSSTransition>
      
      <Suspense fallback={<LoaderSpinner />}>
        <Switch>
          <Route path={routes.home} exact>
            <HomeView />
          </Route>

          <PublicRoute
            path={routes.registration} exact
            isAuthenticated={isAuthenticated}
            redirectTo={routes.contacts}>
            <RegistrationView />
          </PublicRoute>

          <PublicRoute
            path={routes.login} exact
            isAuthenticated={isAuthenticated}
            redirectTo={routes.contacts}>
            <LoginView />
          </PublicRoute>

          <PrivatRoute
            path={routes.contacts} exact
            component={PhoneBookView}
            isAuthenticated={token}
            redirectTo={routes.login}>
            <PhoneBookView />
          </PrivatRoute>
               
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </Container>
  )
}



export default App;
