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

import { documentTextOutline, peopleOutline, statsChart } from "ionicons/icons";

import "./css/Common.css";
import "./css/Profile.css";
import User from "./component/UserInfo";
import UserStats from "./component/UserStats";
import { useRouteMatch } from "react-router";
import { UserInfo } from "../model";
import { API_ORIGIN } from "../utils/api";
import OtherUserTeams from "./component/OtherUserTeams";

const rootinfo = {
  id: 0,
  username: "dummy",
  profilepic: "rooticon.jpeg",
  shortDescription: "short",
  description: "testing",
  tags: ["dummytag", "dummytag2"],
  phonenumber: "1234567890",
  email: "123@gmail.com",
};

const OtherUserProfile: React.FC = () => {
  const [stat, setStat] = useState(false);
  const [info, setInfo] = useState(true);
  const [team, setTeam] = useState(false);
  const [data, setData] = useState<UserInfo>(rootinfo);
  const [userBelongsTeam, setUserBelongsTeam] = useState([]);
  const [sectorName, setSectorName] = useState<string[]>([]);
  const [skillName, setSkillName] = useState<string[]>([]);
  const [skillPoint, setSkillPoint] = useState<number[]>([]);
  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/user/:id");

  useLayoutEffect(() => {
    (async function () {
      const res = await fetch(`${API_ORIGIN}/app/user/${match?.params.id}`);

      const data = await res.json();
      setData(data);

      const selfTeam = await fetch(
        `${API_ORIGIN}/user/team/${match?.params.id}`
      );
      const userTeam = await selfTeam.json();

      setUserBelongsTeam(userTeam);

      const skillres = await fetch(`${API_ORIGIN}/skill/${match?.params.id}`);

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
                data?.profilepic !== undefined || null
                  ? (data?.profilepic).slice(0, 4) === "data"
                    ? `${data.profilepic}`
                    : `${API_ORIGIN}/userUploadedFiles/${data.profilepic}`
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
            />
          </div>

          <IonLabel className="uresname">{data?.username}</IonLabel>

          <div className="profilebar">
            <div
              onClick={() => {
                setInfo(false);
                setStat(true);
                setTeam(false);
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
              }}
            >
              <IonIcon icon={peopleOutline} />
              <IonLabel>My Teams</IonLabel>
            </div>
          </div>
          {info && (
            <User
              description={data?.description}
              phone={data?.phonenumber}
              email={data?.email}
            />
          )}
          {stat && (
            <UserStats
              sectorName={sectorName}
              skillName={skillName}
              skillPoint={skillPoint}
            />
          )}
          {team && <OtherUserTeams team={userBelongsTeam} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OtherUserProfile;
