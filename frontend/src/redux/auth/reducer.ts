import { userInfo } from "../../module";
import { AuthActions } from "./action";

export interface AuthState{
    info: userInfo | null
    loggedIn: boolean | null
}

const initialState: AuthState = {
    info: null,
    loggedIn: null
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case '@@auth/LOGGED_IN':
            return {
                ...state,
                info: action.userinfo,
                loggedIn: true
            }
        case '@@auth/LOGGED_OUT':
            return {
                ...state,
                info: null,
                loggedIn: false
            }
        default:
            return state
    }
}