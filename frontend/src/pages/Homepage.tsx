// Import Swiper React components
import React from 'react';
import { IonContent, IonImg, IonPage, IonLabel, IonButton, IonCard, IonCardContent, IonIcon, IonItem, IonButtons, IonSearchbar, IonToolbar } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";

import com1 from '../img/com1.png'
import com2 from '../img/com2.png'
import com3 from '../img/com3.png'
import com4 from '../img/com4.png'
import com5 from '../img/com5.png'
import cat1 from '../img/cat1.png'
import cat2 from '../img/cat2.png'
import cat3 from '../img/cat3.png'
import team1 from '../img/team1.png'
import team2 from '../img/team2.png'
import icon from '../img/tonystarkicon.png'
import "./Homepage.css";

// Import Swiper styles
import "swiper/css";

import 'swiper/css/autoplay';
import { notificationsOutline } from 'ionicons/icons';

const catergorys = {
  cat1: { src: cat1, title: 'NFT比賽' },
  cat2: { src: cat2, title: '創業比賽' },
  cat3: { src: cat3, title: '投資比賽' }
}


const Homepage: React.FC = () => {

  return (
    <IonPage>
      <IonContent>

        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton onClick={() => { }}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="secondary">
            <IonButton onClick={() => { }}>
            <IonImg className='icon' src={icon} />
            </IonButton>
          </IonButtons>
          <IonSearchbar placeholder="Search" />
        </IonToolbar>

        <IonLabel>Hot Competition</IonLabel>
        <Swiper className="mySwiper"
          slidesPerView={3}
          loop={true}>
          <SwiperSlide className="imgelement"><IonImg src={com1} /></SwiperSlide>
          <SwiperSlide className="imgelement"><IonImg src={com2} /></SwiperSlide>
          <SwiperSlide className="imgelement"><IonImg src={com3} /></SwiperSlide>
          <SwiperSlide className="imgelement"><IonImg src={com4} /></SwiperSlide>
          <SwiperSlide className="imgelement"><IonImg src={com5} /></SwiperSlide>
        </Swiper>

        <IonLabel>Catergories</IonLabel>
        <Swiper className="mySwiper"
          slidesPerView={1}>
          <SwiperSlide className="catelement"><IonImg src={catergorys.cat1.src} />
            <IonLabel>{catergorys.cat1.title}</IonLabel></SwiperSlide>
          <SwiperSlide className="catelement"><IonImg src={catergorys.cat2.src} />
            <IonLabel>{catergorys.cat2.title}</IonLabel></SwiperSlide>
          <SwiperSlide className="catelement"><IonImg src={catergorys.cat3.src} />
            <IonLabel>{catergorys.cat3.title}</IonLabel></SwiperSlide>
        </Swiper>

        <IonLabel>Brownse Team</IonLabel>
        <IonContent>
          <IonCard>
            <IonItem>
              <IonImg src={team1} />
              <IonLabel>ion-item in a card, icon left, button right</IonLabel>
              <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
            <IonCardContent>
              This is content, without any paragraph or header tags,
              within an ion-cardContent element.
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonItem>
              <IonImg src={team2} />
              <IonLabel>ion-item in a card, icon left, button right</IonLabel>
              <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
            <IonCardContent>
              This is content, without any paragraph or header tags,
              within an ion-cardContent element.
            </IonCardContent>
          </IonCard>
        </IonContent>

      </IonContent>
    </IonPage>
  );
};

export default Homepage;