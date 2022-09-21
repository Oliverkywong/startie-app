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
  useIonViewWillEnter,
} from "@ionic/react";

import { Team } from "../model";
import "./css/Common.css";
import "./css/Team.css";

let i = 0
const TeamList: React.FC = () => {
  const [data, setData] = useState<Team[]>([]);
  const [fetchData, setFetchData] = useState<Team[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`);
      const result = await res.json();
      // console.log(result);
      setFetchData(result);
      setData(result.slice(0, 10));
    })();
  }, []);

  let sliceData: Team[] = [];

  const pushData = () => {
    i = i + 10
    sliceData = fetchData.slice(i, i + 10);

    setData([
      ...data,
      ...sliceData
    ]);
  }

  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      console.log("Loaded data");
      ev.target.complete();
      if (data.length === 100) {
        setInfiniteDisabled(true);
      }
    }, 500);
  };

  useIonViewWillEnter(() => {
    pushData();
  });

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
            className="teamListSearchbar"
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
