import { useDispatch } from 'react-redux';

import loginInputFields from './login-fields';
import { authOperations } from '../../redux';

import { InputForm } from '../../components';

import { Container } from './LoginView.css';
import { useCallback } from 'react';

const LoginView = () => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(user => {
    dispatch(authOperations.logIn(user));
  }, [dispatch]);

  return (
    <Container>
      <InputForm
        fields={loginInputFields}
        onSubmitForm={onSubmit}
        btnCaption="Войти"
      />
    </Container>
  )
}

export default LoginView;