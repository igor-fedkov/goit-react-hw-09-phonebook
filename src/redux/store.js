import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import contactsReducer from './phoneBook/phoneBook-reducer';
import authReducer from './auth/auth-reducer.js';
import globalDataReducer from './globalData/globalData-reducer';

const contactsPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['token']
}

const store = configureStore({
  reducer:
  {
    contacts: contactsReducer,
    auth: persistReducer(contactsPersistConfig, authReducer),
    global: globalDataReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
});

const persistor = persistStore(store);

export  { store, persistor };
