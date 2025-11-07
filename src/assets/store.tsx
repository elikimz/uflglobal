import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authAPI } from "../features/register/registerAPI";
import { loginApi } from "../features/login/loginAPI";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [], // or add non-API slice names here
};

// Combine reducers
const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [loginApi.reducerPath]:loginApi.reducer,

 
});

// Only wrap persistable slices
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer, // <--- use persistedReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authAPI.middleware,
      loginApi.middleware,
    
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
