import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './redux/auth/reducer';
import { userInforeducer } from './redux/userInfo/reducer';

const reducers = combineReducers({
    auth : authReducer,
    userInfo: userInforeducer
})

export const store = configureStore({
    reducer: reducers
});