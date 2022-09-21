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

import com1 from "../img/com1.png";
import com2 from "../img/com2.png";
import com3 from "../img/com3.png";
import com4 from "../img/com4.png";
import com5 from "../img/com5.png";
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
  const [eventData, setEventData] = useState<Event[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const loadData = (ev: any) => {
    setTimeout(() => {
      console.log("Loaded data");
      ev.target.complete();
      if (teamData.length === 100) {
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

      const teamRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        }
      });
      const teamResult = await teamRes.json();
      setTeamData(teamResult);

      const eventRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/event`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        }
      });
      const eventResult = await eventRes.json();
      const hotEvent = eventResult.slice(0, 4);
      setEventData(hotEvent);

      const userRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/:id`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        }
      });

      if (userRes.status === 200) {
        const userRecord = await userRes.json();
        dispatch(loadUserInfo(userRecord));
        // setIsLogin(true);
        // router.push("/tab/home");
      }
    })();
  }, []);

  // useEffect(() => {
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

  // useEffect(() => {
  //   (async function () {
  //     const eventRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/event`);
  //     const eventResult = await eventRes.json();
  //     setEventData(eventResult);
  //   })();
  // }, []);

  // const events = useGet<Event[]>('/event')

  return (
    <IonPage>
      <IonHeader className="searchBar">
        <IonToolbar >
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                isLogin ? router.push("/notification") : router.push("/tab/login");
              }}
              // routerLink="/notification"
              
            >
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                isLogin ? router.push("/tab/profile") : router.push("/tab/login");
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
        <p></p>
        <IonLabel className="labelTitle">Hot Events</IonLabel>

        <Swiper
          loop={true}
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper swiper-container"
        >
          {eventData.map((event) => {
            // console.log(event.id);
            return (
              <IonCard key={event.id} routerLink={`/event/${event.id}`}>
                <SwiperSlide className="imgelement">
                  <IonImg
                    src={
                      event.profilepic != null
                        ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${event.profilepic}`
                        : "StartieLogo.png"
                    }
                  />
                </SwiperSlide>
              </IonCard>
            );
          })}
          {/* {events.render(eventData=>eventData.map(event=><div key={event.id}>{}</div>))} */}
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
            Browse Teams
          </IonLabel>
          <div className="teamList">
            {teamData.map((item) => {
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
                        {item.description}
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
