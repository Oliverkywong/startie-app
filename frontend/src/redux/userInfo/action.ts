import { userInfo } from "../../module"

export function loadUserInfo(userInfo:userInfo) {
    return {
        type: '@@userInfo/LOAD_USER_INFO' as const,
        payload: userInfo
    }
}

export type LoadUserInfoAction = ReturnType<typeof loadUserInfo>

export type UserActions = LoadUserInfoAction