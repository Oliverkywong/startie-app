import { UserInfo } from "../../model";
import { AppDispatch } from "../../store";

export function loggedIn(info: UserInfo ,token: string) {
        // console.log(info)
        localStorage.setItem("token", token);
    return {
        
        type: '@@auth/LOGGED_IN' as const,
        userinfo: info,
        token: token
    }
}

export function loggedOut() {
    return {
        type: '@@auth/LOGGED_OUT' as const
    }
}

export function logOut() {
    return (dicpatch: AppDispatch) => {
        localStorage.removeItem('token');
        dicpatch(loggedOut());
    }
}

export type LoggedInAction = ReturnType<typeof loggedIn>
export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction