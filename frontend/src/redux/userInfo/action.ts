import { UserInfo } from "../../module"

export function loadUserInfo(userInfo:UserInfo) {
    return {
        type: '@@userInfo/LOAD_USER_INFO' as const,
        payload: userInfo
    }
}

export type LoadUserInfoAction = ReturnType<typeof loadUserInfo>

export type UserActions = LoadUserInfoAction