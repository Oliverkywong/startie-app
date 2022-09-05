import { userInfo } from "../../module"
import { UserActions } from "./action"

export interface userInfoState {
    userinfo: userInfo
}

const initialState: userInfoState = {
    userinfo: {
        id: 0,
        username: 'dummy',
        profilepic: '../../img/tonystarkicon.png'
    }
}

export function userInforeducer(state: userInfoState = initialState, action: UserActions): userInfoState {
    switch (action.type) {
        case '@@userInfo/LOAD_USER_INFO':
            return {
                ...state,
                userinfo: action.payload
            }
        default:
            return state
    }
}