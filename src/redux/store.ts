import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import carFilterReducer from "./features/car/carSlice";
import settingReducer from "./features/setting/settingSlice";
import userFilterReducer from "./features/user/userSlice";
import blogFilterReducer from "./features/blog/blogSlice";
import openCommentReducer from "./features/comment/commentModalSlice";
import deliveryAndPaymentOptions from "./features/checkout/checkoutSlice";
import basicInfo from "./features/car/basicInfoSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};
const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistAuthReducer,
    carFilter: carFilterReducer,
    settingSlice: settingReducer,
    userFilter: userFilterReducer,
    deliveryAndPayment: deliveryAndPaymentOptions,
    blogFilter: blogFilterReducer,
    openCommentL: openCommentReducer,
    basicInfo: basicInfo,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const perisistor = persistStore(store);
