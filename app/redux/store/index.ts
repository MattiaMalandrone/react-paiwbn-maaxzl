import { userApi } from '../../services/userService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accountApi } from '../../services/accountService';
import {
  persistReducer,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../../redux/reducers';

export const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['core', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    accountApi.middleware,
    userApi.middleware,
  ],
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export { persistor };

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
