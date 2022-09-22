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
import UserInfo from "./UserInfo";
import UserStats from "./UserStats";
import UserTeams from "./UserTeams";
import { useRouteMatch } from "react-router";

const OtherUserProfile: React.FC = () => {
  const [stat, setStat] = React.useState(false);
  const [info, setInfo] = React.useState(true);
  const [team, setTeam] = React.useState(false);
  const [data, setData] = useState<any>([]);
  // const [userBelongsTeam, setUserBelongsTeam] = React.useState([]);
  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/user/:id");

  useLayoutEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        router.push("/tab/login");
      }

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/${match?.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          },
        }
      );

      const data = await res.json();
      setData([data]);

      // const selfTeam = await fetch(
      //   `${process.env.REACT_APP_BACKEND_URL}/user/me/team`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localtoken}`,
      //     },
      //   }
      // );
      // const userTeam = await selfTeam.json();
      // setUserBelongsTeam(userTeam);
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
        {data.map((item: any) => {
          return (
            <div key={item.id} className="profile">
              <div className="profilepicContainer">
                <IonImg
                  className="profilepic"
                  src={
                    item?.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                      : "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
              </div>

              <IonLabel className="uresname">
                {item?.username ? item.username : "new user"}
              </IonLabel>

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
                <UserInfo
                  description={item?.description}
                  phone={item?.phonenumber}
                />
              )}
              {stat && <UserStats />}
              {/* {team && <UserTeams team={userBelongsTeam} />} */}
            </div>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default OtherUserProfile;
