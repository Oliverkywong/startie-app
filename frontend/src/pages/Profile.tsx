import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
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

const Profile: React.FC = () => {
  const userdetails = useAppSelector((state: RootState) => state.auth.info);

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

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar></IonToolbar>
        </IonHeader>
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
          <a href="/tab/profile/edit">
            <IonIcon className="proedit" icon={pencil} />
          </a>
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
              {/* <ion-icon src="/path/to/external/file.svg"></ion-icon> */}
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
          {team && <UserTeams />}
          {setting && <UserSettings />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
