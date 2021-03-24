import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import registrationInputFields from './registration-fields';

import { authOperations }from '../../redux';

import InputForm from '../../components/InputForm';

import { Container } from './RegistrationView.css';

const RegistationView = () => {
  const dispatch = useDispatch();

  const Submit = useCallback(credentials => {
    dispatch(authOperations.register(credentials));
  }, [dispatch]);

  return (
    <Container>
      <InputForm
        fields={registrationInputFields}
        onSubmitForm={Submit}
        btnCaption="Зарегистрироваться"
      />
    </Container>
  )
}

export default RegistationView;