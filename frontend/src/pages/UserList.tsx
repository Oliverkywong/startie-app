import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonRouter,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";

import "./css/Common.css";
import "./css/Team.css";
import { UserInfo } from "../model";
import { API_ORIGIN } from "../utils/api";

const UserList: React.FC = () => {
  const [data, setData] = useState<UserInfo[]>([]);
  const [fetchData, setFetchData] = useState<UserInfo[]>([]);
  const [i, setI] = useState(10);
  const router = useIonRouter();
  const isInfiniteDisabled = data.length >= fetchData.length;

  useEffect(() => {
    (async function () {
      const res = await fetch(`${API_ORIGIN}/app/user`);
      const result = await res.json();

      setData(result.user.slice(0, 10)); //remove.user after backend fix
      setFetchData(result.user);
      setI(10);
    })();
  }, []);

  const pushData = () => {
    let sliceData = fetchData.slice(i, i + 10);
    setI((i) => i + 10);
    setData((data) => [...data, ...sliceData]);
  };

  const loadData = (ev: any) => {
    setTimeout(() => {
      // debounce
      pushData();
      ev.target.complete();
    }, 500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
          <IonTitle className="title">User List</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <input
            className="searchbar"
            placeholder="Search User"
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
              <div className="teamInfo" key={item.id}>
                <div
                  className="teamCard"
                  onClick={() => {
                    router.push(`/tab/user/${item.id}`);
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

                  <p className="teamTitle">{item.username}</p>

                  <p className="teamContent">{item.shortDescription}</p>

                  <div className="tag">
                    {item.tags.map((tag) => {
                      return <span key={tag}>{tag}</span>;
                    })}
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
export default UserList;
