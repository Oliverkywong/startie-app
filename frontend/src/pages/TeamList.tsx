import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCol,
  IonButtons,
  useIonRouter,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonCardTitle,
} from "@ionic/react";

import { Team } from "../model";
import "./css/Common.css";
import "./css/Team.css";

const TeamList: React.FC = () => {
  const [data, setData] = useState<Team[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  const loadData = (ev: any) => {
    setTimeout(() => {
      console.log("Loaded data");
      ev.target.complete();
      if (data.length === 100) {
        setInfiniteDisabled(true);
      }
    }, 500);
  };

  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`);
      const result = await res.json();
      console.log(result);
      setData(result);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
          <IonTitle className="title">Team List</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder="Search"
            onClick={() => {
              router.push("/search");
            }}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="teamList">
          {data.map((item) => {
            return (
              <IonCol key={item.id}>
                <div className="teamInfo">
                  <IonCard
                    className="teamCard"
                    routerLink={`/tab/team/${item.id}`}
                  >
                    <IonImg
                      className="teamIcon"
                      src={
                        item?.profilepic != null
                          ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                          : "https://www.w3schools.com/howto/img_avatar.png"
                      }
                    />
                    <IonCardTitle className="teamTitle">
                      {item.name}
                    </IonCardTitle>

                    <IonCardContent className="teamContent">
                      <p>{item.description}</p>
                    </IonCardContent>

                    <div className="tag">
                      {item.tags.map((tag) => {
                        return <span key={tag}>{tag}</span>;
                      })}
                    </div>
                  </IonCard>
                </div>
              </IonCol>
            );
          })}

          <IonInfiniteScroll
            onIonInfinite={loadData}
            threshold="100px"
            disabled={isInfiniteDisabled}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default TeamList;
