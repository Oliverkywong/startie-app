import { UserInfo } from "../../module"
import { UserActions } from "./action"

export interface userInfoState {
    userinfo: UserInfo
}

const initialState: userInfoState = {
    userinfo: {
        id: 0,
        username: 'dummy',
        profilepic: 'tonystarkicon.png',
        description: 'testing'
    }
}

export function userInforeducer(state: userInfoState = initialState, action: UserActions): userInfoState {
    switch (action.type) {
        case '@@userInfo/LOAD_USER_INFO':
        // console.log(action.payload)
            return {
                ...state,
                userinfo: action.payload
            }
        default:
            return state
    }
}