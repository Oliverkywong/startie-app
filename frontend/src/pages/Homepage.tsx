import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonImg,
  IonPage,
  IonLabel,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonButtons,
  IonSearchbar,
  IonToolbar,
  useIonRouter,
  IonList,
  IonHeader,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCardTitle,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { notificationsOutline } from "ionicons/icons";

import cat1 from "../img/all.png";
import cat2 from "../img/startup.png";
import cat3 from "../img/business.png";
import cat4 from "../img/hackathon.png";
import "./css/Common.css";
import "./css/Homepage.css";

// Import Swiper styles
import "swiper/css";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { loggedIn, logOut } from "../redux/auth/action";
import { EffectCards } from "swiper";
import Profile from "./Profile";
import { loadUserInfo } from "../redux/userInfo/action";
import { Team, Event } from "../model";

const catergorys = {
  cat1: { src: cat1, title: "Investment" },
  cat2: { src: cat2, title: "Startup" },
  cat3: { src: cat3, title: "Business" },
  cat4: { src: cat4, title: "Hackathon" },
};

const Homepage: React.FC = () => {
  const userdetails = useAppSelector(
    (state: RootState) => state.userInfo.userinfo
  );
  const [data, setData] = useState<Team[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [eventData, setEventData] = useState<Event[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();
  const dispatch = useAppDispatch();

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
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        dispatch(logOut());
      }

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/:id`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });

      if (res.status === 200) {
        const userRecord = await res.json();
        dispatch(loadUserInfo(userRecord));
        router.push("/tab/home");
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`);
      const result = await res.json();
      setData(result);

      for (let i = 0; i < result.length; i++) {
        const tagres = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/team/${result[i].id}`
        );

        const item = await tagres.json();
        console.log(item.tag);
        const tagArray: string[] = [];
        for (let i = 0; i < item.teamTag.length; i++) {
          tagArray.push(item.teamTag[i].name);
        }
        setTag(tagArray);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/event`);
      const result = await res.json();
      setEventData(result);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader className="searchBar">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                router.push("/notification");
              }}
            >
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                router.push("/tab/profile", "forward", "push");
              }}
            >
              <IonImg
                className="icon"
                src={`${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${userdetails.profilepic}`}
              />
            </IonButton>
          </IonButtons>
          <IonButtons style={{ width: "100%" }} slot="primary">
            <IonButton
              style={{ width: "100%" }}
              onClick={() => {
                router.push("/search");
              }}
            >
              <IonSearchbar placeholder="Search" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="homecontent">
        <IonLabel className="labelTitle">Hot Events</IonLabel>

        <Swiper
          loop={true}
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper swiper-container"
        >
          {eventData.map((event) => {
            return (
              <SwiperSlide
                key={`event${event.id}`}
                onClick={() => router.push(`event/${event.id}`)}
                className="imgelement"
              >
                <IonImg
                  src={
                    event.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${event.profilepic}`
                      : "StartieLogo.png"
                  }
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <IonLabel className="labelTitle">Catergories</IonLabel>
        <Swiper className="mySwiper" slidesPerView={4} loop={true}>
          <SwiperSlide className="categoryElement">
            <IonImg className="categoryIcon" src={catergorys.cat1.src} />
            <IonLabel className="categoryLable">
              {catergorys.cat1.title}
            </IonLabel>
          </SwiperSlide>
          <SwiperSlide className="categoryElement">
            <IonImg className="categoryIcon" src={catergorys.cat2.src} />
            <IonLabel className="categoryLable">
              {catergorys.cat2.title}
            </IonLabel>
          </SwiperSlide>
          <SwiperSlide className="categoryElement">
            <IonImg className="categoryIcon" src={catergorys.cat3.src} />
            <IonLabel className="categoryLable">
              {catergorys.cat3.title}
            </IonLabel>
          </SwiperSlide>
          <SwiperSlide className="categoryElement">
            <IonImg className="categoryIcon" src={catergorys.cat4.src} />
            <IonLabel className="categoryLable">
              {catergorys.cat4.title}
            </IonLabel>
          </SwiperSlide>
        </Swiper>

        <IonList className="teamListBackgound">
          <IonLabel className="labelTitle blackFontColor">
            Brownse Teams
          </IonLabel>
          <div className="teamList">
            {data.map((item) => {
              return (
                <IonCol key={`Team${item.id}`}>
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
                        {item.description}
                      </IonCardContent>

                      <div className="tag">
                        {item.tags.map((tag) => {
                          return <span key={`teamTags${tag}`}>{tag}</span>;
                        })}
                      </div>
                    </IonCard>
                  </div>
                </IonCol>
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
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
