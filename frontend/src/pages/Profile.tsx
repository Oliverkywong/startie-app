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
  peopleCircleOutline,
  peopleOutline,
  settingsOutline,
  statsChart,
} from "ionicons/icons";

import "./css/Common.css";
import "./css/Profile.css";
import UserStats from "./component/UserStats";
import UserTeams from "./component/UserTeams";
import UserSettings from "./UserSettings";
import { RootState, useAppSelector } from "../store";
import { Team, EventInfo } from "../model";
import { API_ORIGIN } from "../utils/api";
import UserDetail from "./component/UserInfo";
import UserEvents from "./component/UserEvents";

const Profile: React.FC = () => {
  const userdetails = useAppSelector(
    (state: RootState) => state.userInfo.userinfo
  );

  const [sectorName, setSectorName] = useState<string[]>([]);
  const [skillName, setSkillName] = useState<string[]>([]);
  const [skillPoint, setSkillPoint] = useState<number[]>([]);
  const [stat, setStat] = React.useState(false);
  const [info, setInfo] = React.useState(true);
  const [team, setTeam] = React.useState(false);
  const [event, setEvent] = React.useState(false);
  const [setting, setSetting] = React.useState(false);
  const [userBelongsTeam, setUserBelongsTeam] = React.useState<Team[]>([]);
  const [userBelongsEvent, setUserBelongsEvent] = React.useState<EventInfo[]>(
    []
  );

  const router = useIonRouter();

  useLayoutEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null || localtoken === undefined) {
        router.push("/tab/login");
      }

      const res = await fetch(`${API_ORIGIN}/app/user/${userdetails?.id}`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });
      const selfTeam = await fetch(`${API_ORIGIN}/user/me/team`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });
      const userTeam = await selfTeam.json();
      setUserBelongsTeam(userTeam);

      const userEvent = await fetch(`${API_ORIGIN}/user/me/event`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });
      const userEventJson = await userEvent.json();
      setUserBelongsEvent(userEventJson);

      const skillres = await fetch(`${API_ORIGIN}/skill/${userdetails.id}`, {
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
                userdetails?.profilepic !== undefined || null
                  ? (userdetails?.profilepic).slice(0, 4) === "data"
                    ? `${userdetails.profilepic}`
                    : `${API_ORIGIN}/userUploadedFiles/${userdetails.profilepic}`
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
                setEvent(false);
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
                setEvent(false);
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
                setEvent(false);
                setSetting(false);
              }}
            >
              <IonIcon icon={peopleOutline} />
              <IonLabel>Teams</IonLabel>
            </div>

            <div
              onClick={() => {
                setInfo(false);
                setStat(false);
                setTeam(false);
                setEvent(true);
                setSetting(false);
              }}
            >
              <IonIcon icon={peopleCircleOutline} />
              <IonLabel>Events</IonLabel>
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
          {stat && (
            <UserStats
              sectorName={sectorName}
              skillName={skillName}
              skillPoint={skillPoint}
            />
          )}
          {info && (
            <UserDetail
              shortDescription={userdetails?.shortDescription}
              description={userdetails?.description}
              phone={userdetails?.phonenumber}
              email={userdetails?.email}
            />
          )}
          {team && <UserTeams team={userBelongsTeam} />}
          {event && <UserEvents event={userBelongsEvent} />}
          {setting && <UserSettings />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
