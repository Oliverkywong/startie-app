import React, { useLayoutEffect, useState } from "react";
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
  console.log(userdetails);

  const [stat, setStat] = useState(false);
  const [info, setInfo] = useState(true);
  const [team, setTeam] = useState(false);
  const [setting, setSetting] = useState(false);
  const [userBelongsTeam, setUserBelongsTeam] = useState([]);

  const [sectorName, setSectorName] = useState<string[]>([]);
  const [skillName, setSkillName] = useState<string[]>([]);
  const [skillPoint, setSkillPoint] = useState<number[]>([]);

  const router = useIonRouter();

  useLayoutEffect(() => {
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



      const skillres = await fetch(`${process.env.REACT_APP_BACKEND_URL}/skill`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });

      const skilldetails = await skillres.json();

      const sectorNameArray: string[] = [];
      for (let i = 0; i < skilldetails.detail.sector.length; i++) {
        sectorNameArray.push(skilldetails.detail.sector[i].name);
      }
      const skillNameArray: string[] = [];
      const skillPointArray: number[] = [];
      for (let i = 0; i < skilldetails.detail.skill.length; i++) {
        skillNameArray.push(skilldetails.detail.skill[i].name);
        skillPointArray.push(skilldetails.detail.skill[i].point);
      }

      console.log(sectorNameArray);
      console.log(skillNameArray);
      console.log(skillPointArray);

      setSectorName(sectorNameArray);
      setSkillName(skillNameArray);
      setSkillPoint(skillPointArray);


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
              <IonLabel>Account</IonLabel>
            </div>
          </div>
          {info && <UserInfo description={userdetails?.description} phone={userdetails?.phonenumber}/>}
          {stat && <UserStats sectorName={sectorName} skillName={skillName} skillPoint={skillPoint} />}
          {team && <UserTeams team={userBelongsTeam} />}
          {setting && <UserSettings />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
