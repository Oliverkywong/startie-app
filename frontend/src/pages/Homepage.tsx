// Import Swiper React components
import React, { useEffect } from "react";
import {
  IonContent,
  IonImg,
  IonPage,
  IonLabel,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonButtons,
  IonSearchbar,
  IonToolbar,
  useIonRouter,
  IonList,
  IonHeader,
  IonNavLink,
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
import team1 from "../img/team1.png";
import team2 from "../img/team2.png";
import "./css/Homepage.css";

// Import Swiper styles
import "swiper/css";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { loggedIn, logOut } from "../redux/auth/action";
import { EffectCards } from "swiper";
import Profile from "./Profile";
import { loadUserInfo } from "../redux/userInfo/action";

const catergorys = {
  cat1: { src: cat1, title: "All" },
  cat2: { src: cat2, title: "Startup" },
  cat3: { src: cat3, title: "Business" },
  cat4: { src: cat4, title: "Hackathon" },
};

const Homepage: React.FC = () => {
  const userdetails = useAppSelector((state: RootState) => state.userInfo.userinfo);
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      // console.log(userdetails)
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
        // console.log(userRecord)
        dispatch(loadUserInfo(userRecord));
        router.push("/tab/home");
      }
    })();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar className="searchBar">
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
                {/* <IonNavLink className="nav" routerDirection="forward" component={() => <Profile />} > */}
                  <IonImg
                    className="icon"
                    src={`${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${userdetails.profilepic}`}
                  />
                {/* </IonNavLink> */}
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

        <IonLabel className="labelTitle">Hot Events</IonLabel>
        {/* <a href="#">See More</a> */}

        <Swiper
          loop={true}
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper swiper-container"
        >
          <SwiperSlide className="imgelement">
            <IonImg src={com1} />
          </SwiperSlide>
          <SwiperSlide className="imgelement">
            <IonImg src={com2} />
          </SwiperSlide>
          <SwiperSlide className="imgelement">
            <IonImg src={com3} />
          </SwiperSlide>
          <SwiperSlide className="imgelement">
            <IonImg src={com4} />
          </SwiperSlide>
          <SwiperSlide className="imgelement">
            <IonImg src={com5} />
          </SwiperSlide>
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
            <IonCard className="teamCaption">
              <IonItem>
                <IonImg className="teamIcon" src={team1} />
                {/* <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                <IonButton fill="outline" slot="end">
                  View
                </IonButton> */}
              </IonItem>
              <IonCardContent>
                This is content, without any paragraph or header tags, within an
                ion-cardContent element.
              </IonCardContent>
            </IonCard>
            <IonCard className="teamCaption">
              <IonItem>
                <IonImg className="teamIcon" src={team2} />
                {/* <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                <IonButton fill="outline" slot="end">
                  View
                </IonButton> */}
              </IonItem>
              <IonCardContent>
                This is content, without any paragraph or header tags, within an
                ion-cardContent element.
              </IonCardContent>
            </IonCard>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
