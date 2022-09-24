import { UserInfo, Team } from "../../model";

export function loadUserInfo(userInfo: UserInfo) {
  return {
    type: "@@userInfo/LOAD_USER_INFO" as const,
    payload: userInfo,
  };
}

export function loadUserTeam(team: Team[]) {
  return {
    type: "@@userInfo/LOAD_USER_TEAM" as const,
    payload: team,
  };
}

export type LoadUserInfoAction = ReturnType<typeof loadUserInfo>;

export type LoadUserTeamAction = ReturnType<typeof loadUserTeam>;

export type UserActions = LoadUserInfoAction | LoadUserTeamAction;
