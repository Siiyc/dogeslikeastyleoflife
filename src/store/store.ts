import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import breedReducer from "./reducers/breedSlice";
import filterReducer from "./reducers/filterSlice";
import imageReducer from "./reducers/imageSlice";
import toggleReducer from "./reducers/toggleSlice";

const persistConfig = {
  key: "root",
  storage,
};

const filtersReducer = persistReducer(persistConfig, filterReducer);

const rootReducer = combineReducers({
  breedReducer,
  filtersReducer,
  imageReducer,
  toggleReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
