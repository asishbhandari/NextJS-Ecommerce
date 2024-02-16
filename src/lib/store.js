import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cartSlice";
import { persistReducer} from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// import storage from 'redux-persist/lib/storage'

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

export const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer= combineReducers({cart: cartReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false})
  })

// store without persist
// export const store = configureStore({
//     reducer: {
//         cart: cartReducer
//     } 
// })

