// store.js
// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import { userslice, webDataslice } from './slices';

const rootReducer = combineReducers({
  user: userslice,
  web: webDataslice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
