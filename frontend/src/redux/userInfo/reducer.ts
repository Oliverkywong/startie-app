import { userInfoState } from "../../model";
import { UserActions } from "./action";

const initialState: userInfoState = {
  userinfo: {
    id: 0,
    username: "dummy",
    profilepic: null,
    description: "testing",
    tags: ["dummytag", "dummytag2"],
    phonenumber: "1234567890",
  },
  team: [],
};

export function userInforeducer(
  state: userInfoState = initialState,
  action: UserActions
): userInfoState {
  switch (action.type) {
    case "@@userInfo/LOAD_USER_INFO":
      // console.log(action.payload)
      return {
        ...state,
        userinfo: action.payload,
      };
    case "@@userInfo/LOAD_USER_TEAM":
      // console.log(action.payload);
      return {
        ...state,
        team: action.payload,
      };
    default:
      return state;
  }
}
