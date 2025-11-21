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
import { depositAPI } from "../features/deposit/depositAPI";
import { levelsAPI } from "../features/levels/levelsAPI";
import { userLevelsAPI } from "../features/usersLevels/userlevelsAPI";
import { tasksAPI } from "../features/tasks/taskAPI";
import { userTasksAPI } from "../features/userTask/userTaskAPI";
import {  referralsAPI } from "../features/referrals/referralsAPI";
import { wealthFundsAPI } from "../features/wealthfund/wealthfundAdmiAPI";
import { userWealthFundAPI } from "../features/userWealthfund/userWeathfundAPI";
import { companyNewsAPI } from "../features/news/newsAPI";
import { userProfileAPI } from "../features/profile/profileAPI";
import { withdrawalAPI } from "../features/withdrawal/withdrawalAPI";
import { earningsAPI } from "../features/earnings/earningsAPI";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [], // or add non-API slice names here
};

// Combine reducers
const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [loginApi.reducerPath]:loginApi.reducer,
  [depositAPI.reducerPath]:depositAPI.reducer,
  [levelsAPI.reducerPath]:levelsAPI.reducer,
  [userLevelsAPI.reducerPath]:userLevelsAPI.reducer,
  [tasksAPI.reducerPath]:tasksAPI.reducer,
  [userTasksAPI.reducerPath]:userTasksAPI.reducer,
  [referralsAPI.reducerPath]:referralsAPI.reducer,
  [wealthFundsAPI.reducerPath]:wealthFundsAPI.reducer,
  [userWealthFundAPI.reducerPath]:userWealthFundAPI.reducer,
  [companyNewsAPI.reducerPath]:companyNewsAPI.reducer,
  [userProfileAPI.reducerPath]:userProfileAPI.reducer,
  [withdrawalAPI.reducerPath]:withdrawalAPI.reducer,
  [earningsAPI.reducerPath]:earningsAPI.reducer,

 
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
      depositAPI.middleware,
      levelsAPI.middleware,
      userLevelsAPI.middleware,
      tasksAPI.middleware,
      userTasksAPI.middleware,
      referralsAPI.middleware,
      wealthFundsAPI.middleware,
      userWealthFundAPI.middleware,
      companyNewsAPI.middleware,
      userProfileAPI.middleware,
      withdrawalAPI.middleware,
      earningsAPI.middleware,
    
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
