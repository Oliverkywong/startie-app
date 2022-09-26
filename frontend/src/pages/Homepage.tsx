import React, { useLayoutEffect, useState } from "react";
import {
  IonContent,
  IonImg,
  IonPage,
  IonLabel,
  IonButton,
  IonCard,
  IonIcon,
  IonButtons,
  useIonRouter,
  IonList,
  IonCol,
  IonCardTitle,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Share } from "@capacitor/share";
import { notificationsOutline, shareOutline } from "ionicons/icons";

import cat1 from "../img/all.png";
import cat2 from "../img/startup.png";
import cat3 from "../img/business.png";
import cat4 from "../img/hackathon.png";
import "./css/Common.css";
import "./css/Homepage.css";

// Import Swiper styles
import "swiper/css";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { loggedIn } from "../redux/auth/action";
import { EffectCards } from "swiper";
import { loadUserInfo } from "../redux/userInfo/action";
import { Team, EventInfo } from "../model";
import { API_ORIGIN } from "../utils/api";
// import { useGet } from "../hooks/useGet";

const categories = {
  cat1: { src: cat1, title: "All" },
  cat2: { src: cat2, title: "Startup" },
  cat3: { src: cat3, title: "Business" },
  cat4: { src: cat4, title: "Hackathon" },
};

const Homepage: React.FC = () => {
  const userdetails = useAppSelector(
    (state: RootState) => state.userInfo.userinfo
  );
  const isLogin = useAppSelector((state: RootState) => state.auth.loggedIn);
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [eventData, setEventData] = useState<EventInfo[]>([]);
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken != null) {
        const res = await fetch(`${API_ORIGIN}/app/user/me`, {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          },
        });
        const userRecord = await res.json();
        dispatch(loadUserInfo(userRecord));
        dispatch(loggedIn(userRecord, localtoken));
      }

      const teamRes = await fetch(`${API_ORIGIN}/app/team`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });
      const teamResult = await teamRes.json();

      setTeamData(teamResult.teams.slice(0, 4)); // remove .teams.rows after backend fix

      const eventRes = await fetch(`${API_ORIGIN}/app/event`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });
      const eventResult = await eventRes.json();
      const hotEvent = eventResult.events.slice(0, 4);
      setEventData(hotEvent);

      // const userRes = await fetch(
      //   `${API_ORIGIN}/app/user/:id`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localtoken}`,
      //     },
      //   }
      // );

      // if (userRes.status === 200) {
      //   const userRecord = await userRes.json();
      //   dispatch(loadUserInfo(userRecord));
      //   // setIsLogin(true);
      //   // router.push("/tab/home");
      // }
    })();
  }, []);

  // useLayoutEffect(() => {
  //   (async function () {
  //     const teamRes = await fetch(`${API_ORIGIN}/team`);
  //     const teamResult = await teamRes.json();
  //     setTeamData(teamResult);
  //     console.log(teamResult);

  //     for (let i = 0; i < teamResult.length; i++) {
  //       const tagRes = await fetch(
  //         `${API_ORIGIN}/team/${teamResult[i].id}`
  //       );

  //       const tagItem = await tagRes.json();
  //       const tagArray: string[] = [];
  //       for (let i = 0; i < tagItem.teamTag.length; i++) {
  //         tagArray.push(tagItem.teamTag[i].name);
  //       }
  //       setTag(tagArray);
  //     }
  //   })();
  // }, []);

  // useLayoutEffect(() => {
  //   (async function () {
  //     const eventRes = await fetch(`${API_ORIGIN}/event`);
  //     const eventResult = await eventRes.json();
  //     setEventData(eventResult);
  //   })();
  // }, []);

  // const events = useGet<Event[]>('/event')

  // const events = useGet<Event[]>('/event')

  return (
    <IonPage>
      <IonHeader className="header">
        <IonToolbar color="dark">
          <div className="homePageHeader">
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  isLogin
                    ? router.push("/tab/profile")
                    : router.push("/tab/login");
                }}
              >
                <IonImg
                  className="icon"
                  src={
                    userdetails?.profilepic !== null
                      ? (userdetails?.profilepic).slice(0, 4) === "data"
                        ? `${userdetails.profilepic}`
                        : `${API_ORIGIN}/userUploadedFiles/${userdetails.profilepic}`
                      : "https://www.w3schools.com/howto/img_avatar.png"
                  }
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
                <input className="searchbar" placeholder="Search" />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                slot="end"
                onClick={() => {
                  isLogin
                    ? router.push("/notification")
                    : router.push("/tab/login");
                }}
                // routerLink="/notification"
              >
                <IonIcon icon={notificationsOutline} />
              </IonButton>
            </IonButtons>
          </div>
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
          {/* {eventData.error?<p>
            Failed to load event list: 
            {eventData.error}
          </p>:null} */}
          {eventData.map((event) => {
            return (
              <SwiperSlide
                key={`event${event.id}`}
                onClick={() => router.push(`event/${event.id}`)}
                className="imgelement"
              >
                <img
                  className="homePageEventThumbnail"
                  src={
                    event?.event_profilepic !== null
                      ? (event?.event_profilepic).slice(0, 4) === "data"
                        ? `${event.event_profilepic}`
                        : `${API_ORIGIN}/userUploadedFiles/${event.event_profilepic}`
                      : "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
              </SwiperSlide>
            );
          })}
          {/* {events.render(eventData=>eventData.map(event=><div key={event.id}>{}</div>))} */}
        </Swiper>

        <IonLabel className="labelTitle">Catergories</IonLabel>
        <Swiper className="mySwiper" slidesPerView={4} loop={true}>
          <SwiperSlide>
            <div
              className="categoryElement"
              onClick={() => {
                router.push(`/tab/event`);
              }}
            >
              <IonImg className="categoryIcon" src={categories.cat1.src} />
              <IonLabel className="categoryLable">
                {categories.cat1.title}
              </IonLabel>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="categoryElement"
              onClick={() => {
                router.push(`/tab/event/category/startup`);
              }}
            >
              <IonImg className="categoryIcon" src={categories.cat2.src} />
              <IonLabel className="categoryLable">
                {categories.cat2.title}
              </IonLabel>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="categoryElement"
              onClick={() => {
                router.push(`/tab/event/category/business`);
              }}
            >
              <IonImg className="categoryIcon" src={categories.cat3.src} />
              <IonLabel className="categoryLable">
                {categories.cat3.title}
              </IonLabel>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="categoryElement"
              onClick={() => {
                router.push(`/tab/event/category/hackathon`);
              }}
            >
              <IonImg className="categoryIcon" src={categories.cat4.src} />
              <IonLabel className="categoryLable">
                {categories.cat4.title}
              </IonLabel>
            </div>
          </SwiperSlide>
        </Swiper>

        <IonList className="teamListBackgound">
          <IonLabel className="labelTitle blackFontColor">
            Browse Teams
          </IonLabel>
          <div className="teamList homePageTeamList">
            {teamData.map((item) => {
              return (
                <IonCol key={item.id}>
                  <div className="teamInfo">
                    <IonCard
                      className="teamCard"
                      routerLink={`/tab/team/${item.id}`}
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

                      <span className="teamContent">
                        {item.shortDescription}
                      </span>

                      <div className="tag">
                        {item.tags.map((tag) => {
                          return <span key={tag}>{tag}</span>;
                        })}
                      </div>
                      <div className="shareButton">
                        <IonIcon
                          icon={shareOutline}
                          onClick={async () => {
                            await Share.share({
                              title: "See cool stuff",
                              text: "Come to join us",
                              url: `https://startie.oliverstrat.me/tab/team/${item.id}`,
                              dialogTitle: "Share with buddies",
                            });
                          }}
                        />
                      </div>
                    </IonCard>
                  </div>
                </IonCol>
              );
            })}
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
