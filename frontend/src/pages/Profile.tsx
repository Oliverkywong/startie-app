import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNavLink,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import {
  bookmarkOutline,
  documentTextOutline,
  pencil,
  peopleOutline,
  settingsOutline,
  statsChart,
} from "ionicons/icons";

import "./css/Profile.css";
import UserInfo from "./UserInfo";
import UserStats from "./UserStats";
import UserTeams from "./UserTeams";
import UserFollows from "./UserFollows";
import UserSettings from "./UserSettings";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { loggedIn } from "../redux/auth/action";
import { loadUserTeam } from "../redux/userInfo/action";

const Profile: React.FC = () => {
  const userdetails = useAppSelector((state: RootState) => state.auth.info);
  const userBelongsTeam = useAppSelector(
    (state: RootState) => state.userInfo.team
  );
  console.log(userBelongsTeam);

  const [info, setInfo] = React.useState(true);
  const [stat, setStat] = React.useState(false);
  const [follow, setFollow] = React.useState(false);
  const [team, setTeam] = React.useState(false);
  const [setting, setSetting] = React.useState(false);

  const router = useIonRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        return;
      }
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${userdetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          },
        }
      );

      if (res.status === 200) {
        const userRecord = await res.json();
        // console.log(userRecord)
        dispatch(loggedIn(userRecord, localtoken!));
        // router.push("/tab/home");
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        return;
      }
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/me/team`,
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          },
        }
      );

      if (res.status === 200) {
        const userTeam = await res.json();
        console.log(userTeam);
        dispatch(loadUserTeam(userTeam));
        // router.push("/tab/home");
      }
    })();
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="profile">
            <div className="profilepicContainer">
              <IonImg
                className="profilepic"
                src={
                  userdetails?.profilepic != null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${userdetails.profilepic}`
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
              />
            </div>
            <IonItem routerLink="/tab/profile/edit">
              <IonIcon className="proedit" icon={pencil} />
            </IonItem>
            <IonLabel className="uresname">
              {userdetails?.username ? userdetails.username : "new user"}
            </IonLabel>

            <div className="profilebar">
              <div
                onClick={() => {
                  setInfo(false);
                  setStat(true);
                  setFollow(false);
                  setTeam(false);
                  setSetting(false);
                }}
              >
                <IonIcon icon={statsChart} />
                <IonLabel>Stats</IonLabel>
              </div>

              <div
                onClick={() => {
                  setInfo(true);
                  setStat(false);
                  setFollow(false);
                  setTeam(false);
                  setSetting(false);
                }}
              >
                <IonIcon icon={documentTextOutline} />
                <IonLabel>Details</IonLabel>
              </div>

              <div
                onClick={() => {
                  setInfo(false);
                  setStat(false);
                  setFollow(true);
                  setTeam(false);
                  setSetting(false);
                }}
              >
                <IonIcon icon={bookmarkOutline} />
                <IonLabel>My Follows</IonLabel>
              </div>
              <div
                onClick={() => {
                  setInfo(false);
                  setStat(false);
                  setFollow(false);
                  setTeam(true);
                  setSetting(false);
                }}
              >
                <IonIcon icon={peopleOutline} />
                <IonLabel>My Teams</IonLabel>
              </div>
              <div
                onClick={() => {
                  router.push("/tab/settings");
                }}
              >
                <IonIcon icon={settingsOutline} />
                <IonLabel>Settings</IonLabel>
              </div>
            </div>
            {info && <UserInfo description={userdetails?.description} />}
            {stat && <UserStats />}
            {follow && <UserFollows />}
            {team && <UserTeams team={userBelongsTeam} />}
            {setting && <UserSettings />}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Profile;
