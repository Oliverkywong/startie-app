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
  IonGrid,
  IonCol,
  IonRow,
  IonButtons,
  useIonRouter,
  IonItem,
  IonToolbar,
  IonTitle,
  IonBackButton,
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
      // console.log(result);
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
        <IonGrid>
          <IonRow>
            {data.map((item) => {
              return (
                <IonCol size="6" key={item.id}>
                  <IonItem routerLink={`/tab/team/${item.id}`}>
                    <IonCard className="card">
                      <IonImg
                        src={
                          item?.profilepic != null
                            ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                        style={{ width: "100%" }}
                      />
                      <IonCardContent
                        className="content"
                        style={{ fontSize: "10px" }}
                      >
                        <p style={{ fontSize: "14px", color: "white" }}>
                          {item.name}
                        </p>
                        <br />
                        <p style={{ fontSize: "10px", color: "white" }}>
                          {item.description}
                        </p>
                        <div className="tag">
                          {item.tags.map((tag) => {
                            return <span key={tag}>{tag}</span>;
                          })}
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonItem>
                </IonCol>
              );
            })}
          </IonRow>
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default TeamList;
