import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Tab2.css';

import cat from '../img/cat1.png'

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Swiper className="mySwiper"

          loop={true}>
          <SwiperSlide><IonImg src={'http://placekitten.com/g/200/300'} /></SwiperSlide>
          <SwiperSlide><IonImg src={cat} /></SwiperSlide>
          <SwiperSlide><IonImg src={'http://placekitten.com/g/200/300'} /></SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
