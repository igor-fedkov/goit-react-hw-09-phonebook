import { Button } from '@material-ui/core';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authSelectors, authOperations } from '../../redux';

import { ButtonContainer, Greeting, UserMunuEl } from './UserMenu.css';

const UserMenu = () => {
  const name = useSelector(authSelectors.getUserName);

  const dispatch = useDispatch();
  const onLogOut = useCallback(() => dispatch(authOperations.logOut()), [dispatch]);

  return (
    <UserMunuEl>
      <Greeting>Привет, {name}</Greeting>
      <ButtonContainer>
        <Button
          type="button"
          onClick={onLogOut}
          variant="contained"
        >
          Выйти
        </Button>
      </ButtonContainer>
    </UserMunuEl>
  )
}

export default UserMenu;