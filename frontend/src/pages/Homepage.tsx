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
import { logOut } from "../redux/auth/action";
import { EffectCards } from "swiper";
import { loadUserInfo } from "../redux/userInfo/action";
import { Team, EventInfo } from "../model";
// import { useGet } from "../hooks/useGet";

const catergorys = {
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
  // const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  // const loadData = (ev: any) => {
  //   setTimeout(() => {
  //     console.log("Loaded data");
  //     ev.target.complete();
  //     if (teamData.length === 100) {
  //       setInfiniteDisabled(true);
  //     }
  //   }, 500);
  // };

  useLayoutEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        dispatch(logOut());
      }
      console.log(localtoken);
      console.log(isLogin);

      const teamRes = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/app/team`,
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          },
        }
      );
      const teamResult = await teamRes.json();

      setTeamData(teamResult.teams.rows.slice(0, 4)); // remove .teams.rows after backend fix

      const eventRes = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/app/event`,
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          },
        }
      );
      const eventResult = await eventRes.json();
      const hotEvent = eventResult.events.slice(0, 4);
      setEventData(hotEvent);

      // const userRes = await fetch(
      //   `${process.env.REACT_APP_BACKEND_URL}/app/user/:id`,
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
  //     const teamRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`);
  //     const teamResult = await teamRes.json();
  //     setTeamData(teamResult);
  //     console.log(teamResult);

  //     for (let i = 0; i < teamResult.length; i++) {
  //       const tagRes = await fetch(
  //         `${process.env.REACT_APP_BACKEND_URL}/team/${teamResult[i].id}`
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
  //     const eventRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/event`);
  //     const eventResult = await eventRes.json();
  //     setEventData(eventResult);
  //   })();
  // }, []);

  // const events = useGet<Event[]>('/event')

  // const events = useGet<Event[]>('/event')

  return (
    <IonPage>
      <IonHeader className="header">
        <IonToolbar className="searchBar">
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
                // src={`${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${userdetails.profilepic}`}
                src={
                  userdetails.profilepic !== null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${userdetails.profilepic}`
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
                    event.event_profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${event.event_profilepic}`
                      : "StartieLogo.png"
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
              <IonImg className="categoryIcon" src={catergorys.cat1.src} />
              <IonLabel className="categoryLable">
                {catergorys.cat1.title}
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
              <IonImg className="categoryIcon" src={catergorys.cat2.src} />
              <IonLabel className="categoryLable">
                {catergorys.cat2.title}
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
              <IonImg className="categoryIcon" src={catergorys.cat3.src} />
              <IonLabel className="categoryLable">
                {catergorys.cat3.title}
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
              <IonImg className="categoryIcon" src={catergorys.cat4.src} />
              <IonLabel className="categoryLable">
                {catergorys.cat4.title}
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
                          item?.profilepic != null
                            ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                      />

                      <IonCardTitle className="teamTitle">
                        {item.name}
                      </IonCardTitle>

                      <p className="teamContent">{item.shortDescription}</p>

                      <div className="tag">
                        {item.tags.map((tag) => {
                          return <span key={tag}>{tag}</span>;
                        })}
                      </div>
                      <div className="shareButton">
                        <IonIcon icon={shareOutline} />
                      </div>
                    </IonCard>
                  </div>
                </IonCol>
              );
            })}
          </div>
          {/* <IonInfiniteScroll
            onIonInfinite={loadData}
            threshold="100px"
            disabled={isInfiniteDisabled}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
