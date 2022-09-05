import { userInfo } from "../../module";

export function loggedIn(info: userInfo) {
    return {
        type: '@@auth/LOGGED_IN' as const,
        userinfo: info
    }
}

export function loggedOut() {
    return {
        type: '@@auth/LOGGED_OUT' as const,
    }
}

export type LoggedInAction = ReturnType<typeof loggedIn>
export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction