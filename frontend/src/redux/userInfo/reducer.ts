import { userInfoState } from "../../model";
import { UserActions } from "./action";

const initialState: userInfoState = {
  userinfo: {
    id: 0,
    username: "dummy",
    profilepic: "rooticon.jpeg",
    shortDescription: "short",
    description: "testing",
    tags: ["dummytag", "dummytag2"],
    phonenumber: "1234567890",
    email: "123@gmail.com",
  },
  team: [],
};

export function userInforeducer(
  state: userInfoState = initialState,
  action: UserActions
): userInfoState {
  switch (action.type) {
    case "@@userInfo/LOAD_USER_INFO":
      return {
        ...state,
        userinfo: action.payload,
      };
    case "@@userInfo/LOAD_USER_TEAM":
      return {
        ...state,
        team: action.payload,
      };
    default:
      return state;
  }
}
