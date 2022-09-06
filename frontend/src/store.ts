import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authReducer } from './redux/auth/reducer';
import { userInforeducer } from './redux/userInfo/reducer';

const reducers = combineReducers({
    auth : authReducer,
    userInfo: userInforeducer
})

export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const store = configureStore({
    reducer: reducers
});