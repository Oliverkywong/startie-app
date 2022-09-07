import { UserInfo } from "../../module";
import { AuthActions } from "./action";

export interface AuthState{
    info: UserInfo | null
    loggedIn: boolean | null
    token: string | null
}

const initialState: AuthState = {
    info: null,
    loggedIn: null,
    token: null
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case '@@auth/LOGGED_IN':
            return {
                ...state,
                info: action.userinfo,
                loggedIn: true,
                token: action.token
            }
        case '@@auth/LOGGED_OUT':
            return {
                ...state,
                info: null,
                loggedIn: false,
                token: null
            }
        default:
            return state
    }
}