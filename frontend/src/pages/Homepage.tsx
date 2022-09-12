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
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { notificationsOutline } from "ionicons/icons";

import com1 from "../img/com1.png";
import com2 from "../img/com2.png";
import com3 from "../img/com3.png";
import com4 from "../img/com4.png";
import com5 from "../img/com5.png";
import cat1 from "../img/cat1.png";
import cat2 from "../img/cat2.png";
import cat3 from "../img/cat3.png";
import team1 from "../img/team1.png";
import team2 from "../img/team2.png";
import "./css/Homepage.css";

// Import Swiper styles
import "swiper/css";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { loggedIn, logOut } from "../redux/auth/action";

const catergorys = {
  cat1: { src: cat1, title: "NFT比賽" },
  cat2: { src: cat2, title: "創業比賽" },
  cat3: { src: cat3, title: "投資比賽" },
};

const Homepage: React.FC = () => {
  const userdetails = useAppSelector((state: RootState) => state.auth.info);
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      // console.log(userdetails)
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        dispatch(logOut());
      }
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userInfo`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });

      if (res.status === 200) {
        const userRecord = await res.json();
        // console.log(userRecord)
        dispatch(loggedIn(userRecord["userInfo"], localtoken!));
        router.push("/tab/home");
      }
    })();
  }, []);

  return (
    <IonPage>
      <IonContent>
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
              <IonImg
                className="icon"
                src={`${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${userdetails?.profilepic}`}
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

        <IonLabel className="labelTitle">Hot Events</IonLabel>
        {/* <a href="#">See More</a> */}

        <Swiper className="mySwiper" slidesPerView={3} loop={true}>
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
        <a className="alignRight" href="#">
          More
        </a>
        <Swiper className="mySwiper" slidesPerView={1}>
          <SwiperSlide className="catelement">
            <IonImg className="categoryIcon" src={catergorys.cat1.src} />
            <IonLabel className="categoryLable">
              {catergorys.cat1.title}
            </IonLabel>
          </SwiperSlide>
          <SwiperSlide className="catelement">
            <IonImg className="categoryIcon" src={catergorys.cat2.src} />
            <IonLabel className="categoryLable">
              {catergorys.cat2.title}
            </IonLabel>
          </SwiperSlide>
          <SwiperSlide className="catelement">
            <IonImg className="categoryIcon" src={catergorys.cat3.src} />
            <IonLabel className="categoryLable">
              {catergorys.cat3.title}
            </IonLabel>
          </SwiperSlide>
        </Swiper>

        <IonList className="teamListBackgound">
          <IonLabel className="labelTitle blackFontColor">
            Brownse Teams
          </IonLabel>
          <a className="alignRight" href="/tab/team">
            More
          </a>
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
