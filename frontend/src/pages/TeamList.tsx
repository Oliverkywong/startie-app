import React, { useLayoutEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButtons,
  useIonRouter,
  IonToolbar,
  IonTitle,
  IonBackButton,
  useIonViewWillEnter,
  IonCardContent,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";

import { Team } from "../model";
import "./css/Common.css";
import "./css/Team.css";
import { shareOutline } from "ionicons/icons";

const TeamList: React.FC = () => {
  const [data, setData] = useState<Team[]>([]);
  const [fetchData, setFetchData] = useState<Team[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [i, setI] = useState(0);
  const router = useIonRouter();

  useLayoutEffect(() => {
    (async function () {
      console.log(i)
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/team`);
      const result = await res.json();
      setFetchData(result.teams.rows);
      setData(result.teams.rows.slice(i, i + 10));
      setI(i + 10);
    })();
  }, []);

  let sliceData: Team[] = [];

  const pushData = () => {
    sliceData = fetchData.slice(i, i + 10);
    setI(i + 10);
    setData([...data, ...sliceData]);
  };

  const loadData = (ev: any) => { //set loading state
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
          <div className="searchbarContainer">
            <input
              className="searchbar"
              placeholder="Search Position"
              onClick={() => {
                router.push("/search");
              }}
            />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="teamList">
          {data.map((item) => {
            return (
              <div className="teamInfo" key={item.id}>
                <div
                  className="teamCard"
                  onClick={() => {
                    router.push(`/tab/team/${item.id}`);
                  }}
                >
                  <img
                    className="teamIcon"
                    src={
                      item?.profilepic != null
                        ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                        : "https://www.w3schools.com/howto/img_avatar.png"
                    }
                  />
                  <IonCardTitle className="teamTitle">{item.name}</IonCardTitle>

                  <p className="teamContent">{item.shortDescription}</p>

                  <p className="teamLookingFor">Looking for: </p>

                  <div className="tag">
                    {item.tags.map((tag) => {
                      return <span key={tag}>{tag}</span>;
                    })}
                  </div>

                  <div className="shareButton">
                    <IonIcon icon={shareOutline} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
      </IonContent>
    </IonPage>
  );
};
export default TeamList;
