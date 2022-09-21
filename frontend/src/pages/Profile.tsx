import React, { useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import {
  documentTextOutline,
  pencil,
  peopleOutline,
  settingsOutline,
  statsChart,
} from "ionicons/icons";

import "./css/Common.css";
import "./css/Profile.css";
import UserInfo from "./UserInfo";
import UserStats from "./UserStats";
import UserTeams from "./UserTeams";
import UserSettings from "./UserSettings";
import { RootState, useAppSelector } from "../store";

const Profile: React.FC = () => {
  const userdetails = useAppSelector(
    (state: RootState) => state.userInfo.userinfo
  );

  const [stat, setStat] = React.useState(true);
  const [info, setInfo] = React.useState(false);
  const [team, setTeam] = React.useState(false);
  const [setting, setSetting] = React.useState(false);
  const [userBelongsTeam, setUserBelongsTeam] = React.useState([]);

  const router = useIonRouter();

  useEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        router.push("/tab/login");
      }

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/app/user/${userdetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          },
        }
      );
      const selfTeam = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/me/team`,
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          },
        }
      );
      const userTeam = await selfTeam.json();
      console.log(userTeam);
      setUserBelongsTeam(userTeam);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
            <IonTitle className="title">Profile</IonTitle>
          </IonButtons>
        </IonToolbar>
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
          <div onClick={() => router.push("/useredit")}>
            <IonIcon color="light" className="proedit" icon={pencil}></IonIcon>
          </div>

          <IonLabel className="uresname">
            {userdetails?.username ? userdetails.username : "new user"}
          </IonLabel>

          <div className="profilebar">
            <div
              onClick={() => {
                setInfo(false);
                setStat(true);
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
                setTeam(true);
                setSetting(false);
              }}
            >
              <IonIcon icon={peopleOutline} />
              <IonLabel>My Teams</IonLabel>
            </div>
            <div
              onClick={() => {
                router.push("/settings");
              }}
            >
              <IonIcon icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </div>
          </div>
          {info && <UserInfo description={userdetails?.description} />}
          {stat && <UserStats />}
          {team && <UserTeams team={userBelongsTeam} />}
          {setting && <UserSettings />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
