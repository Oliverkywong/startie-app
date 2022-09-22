import React, { useLayoutEffect, useState } from "react";
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

const UserList: React.FC = () => {
  const [data, setData] = useState<UserInfo[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  useLayoutEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      console.log(result);
      setData(result.user); //remove.user after backend fix
    })();
  }, []);

  const loadData = (ev: any) => {
    setTimeout(() => {
      console.log("Loaded data");
      ev.target.complete();
      if (data.length === 100) {
        setInfiniteDisabled(true);
      }
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
                    router.push(`/app/user/${item.id}`);
                  }}
                >
                  <img
                    className="teamIcon"
                    src={`${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`}
                  />

                  <p className="teamTitle">{item.username}</p>

                  <p className="teamContent">{item.description}</p>

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
