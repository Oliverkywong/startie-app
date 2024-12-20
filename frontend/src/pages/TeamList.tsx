import React, { useEffect, useState } from "react";
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
  IonIcon,
} from "@ionic/react";
import { Share } from "@capacitor/share";
import { Team } from "../model";
import "./css/Common.css";
import "./css/Team.css";
import { shareOutline } from "ionicons/icons";
import { API_ORIGIN } from "../utils/api";

const TeamList: React.FC = () => {
  const [data, setData] = useState<Team[]>([]);
  const [fetchData, setFetchData] = useState<Team[]>([]);
  const [i, setI] = useState(10);
  const router = useIonRouter();

  const isInfiniteDisabled = data.length >= fetchData.length;

  useEffect(() => {
    (async function () {
      const res = await fetch(`${API_ORIGIN}/app/team`);
      const result = await res.json();
      let newTeams = result.teams;

      setData(newTeams.slice(0, 10));
      setFetchData(newTeams);
      setI(10);
    })();
  }, []);

  const pushData = () => {
    let sliceData = fetchData.slice(i, i + 10);
    setI((i) => i + 10);
    setData((data) => [...data, ...sliceData]);
  };

  const loadData = (ev: any) => {
    //set loading state
    setTimeout(() => {
      pushData();
      ev.target.complete();
    }, 500);
  };

  // useIonViewWillEnter(() => {
  // pushData();
  // },[]);

  // console.log('render:',{i,data:data.length,fetchData:fetchData.length})
  // Object.assign(window,{data})

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
                      item?.profilepic !== null
                        ? (item?.profilepic).slice(0, 4) === "data"
                          ? `${item.profilepic}`
                          : `${API_ORIGIN}/userUploadedFiles/${item.profilepic}`
                        : "https://www.w3schools.com/howto/img_avatar.png"
                    }
                  />
                  <p className="teamTitle">{item.name}</p>

                  <span className="teamContent">{item.shortDescription}</span>

                  <span className="teamLookingFor">Looking for: </span>

                  <div className="tag">
                    {item.tags.map((tag) => {
                      return <span key={tag}>{tag}</span>;
                    })}
                  </div>

                  <div className="shareButton"
                        onClick={async (e) => {
                          await Share.share({
                            title: "See cool stuff",
                            text: "Come to join us",
                            url: `https://startie.oliverstrat.me/tab/team/${item.id}`,
                            dialogTitle: "Share with buddies",
                          });
                          e.stopPropagation();
                        }}>
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
