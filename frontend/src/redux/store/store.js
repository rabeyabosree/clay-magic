import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import userReducer from '../reducers/userSlice';
import profileSlice from "../reducers/profileSlice";
import productSlice from "../reducers/productsSlice";
import product from "../reducers/productsSlice";
import cartSlice from "../reducers/cartslice";
import orderSlice from "../reducers/orderSlice";
import notificationsSlice from './../reducers/notificationSlice';

// Persist Config
const persistConfig = {
   key: 'root',
   storage
};

// Root Reducer
const rootReducer = combineReducers({
    user: userReducer,
    profile: profileSlice,
    products: productSlice,
    product: product,
    cart: cartSlice,
    orders: orderSlice,
    notifications : notificationsSlice
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store Configuration
export const store = configureStore({
   reducer: persistedReducer
});

// Persistor
export const persist = persistStore(store);
