import { IonPage, IonHeader, IonSearchbar, IonButtons, useIonRouter, IonButton, IonToolbar, IonLabel, IonContent, IonIcon, IonChip, IonImg, IonList, IonBackButton } from '@ionic/react'
import { flameOutline, trashOutline } from 'ionicons/icons';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import cat1 from '../img/cat1.png'
import cat2 from '../img/cat2.png'
import cat3 from '../img/cat3.png'
import "swiper/css";

export default function SearchPage() {

    const router = useIonRouter();
    const catergorys = {
        cat1: { src: cat1, title: 'NFT Team' },
        cat2: { src: cat2, title: 'Business Team' },
        cat3: { src: cat3, title: 'Insevment Team' },
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonSearchbar placeholder="Search" />
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => {}}>Cancel</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonToolbar>
                    <IonLabel>Search History</IonLabel>
                    <IonButtons slot="end">
                        <IonButton onClick={() => { }}>
                            <IonIcon icon={trashOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonChip style={{ backgroundColor: '#999' }} outline={true}>Outline</IonChip>
                <IonChip style={{ backgroundColor: '#999' }} outline={true}>Outline</IonChip>
                <IonChip style={{ backgroundColor: '#999' }} outline={true}>Outline</IonChip>
                <IonChip style={{ backgroundColor: '#999' }} outline={true}>Outline</IonChip>
                <IonChip style={{ backgroundColor: '#999' }} outline={true}>Outline</IonChip>
                <IonToolbar>
                    <IonLabel>Top Search</IonLabel>
                    <IonIcon icon={flameOutline} />
                </IonToolbar>
                <IonChip style={{ backgroundColor: '#999' }} outline={true}>Outline</IonChip>
                <IonChip style={{ backgroundColor: '#999' }} outline={true}>Outline</IonChip>
                <IonChip style={{ backgroundColor: '#999' }} outline={true}>Outline</IonChip>
                <IonToolbar>
                    <IonLabel>Team</IonLabel>
                    <IonButtons slot="end">
                        <a href='/tab/team'>More</a>
                    </IonButtons>
                </IonToolbar>
                <Swiper className="mySwiper"
                    slidesPerView={1}>
                    <SwiperSlide className="catelement">
                        <a href='/tab/team'>
                            <IonImg src={catergorys.cat1.src} />
                            <IonLabel>{catergorys.cat1.title}</IonLabel>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide className="catelement">
                        <a href='/tab/team'>
                            <IonImg src={catergorys.cat2.src} />
                            <IonLabel>{catergorys.cat2.title}</IonLabel>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide className="catelement">
                        <a href='/tab/team'>
                            <IonImg src={catergorys.cat3.src} />
                            <IonLabel>{catergorys.cat3.title}</IonLabel>
                        </a>
                    </SwiperSlide>
                </Swiper>
                <IonToolbar>
                    <IonLabel>Event</IonLabel>
                    <IonButtons slot="end">
                        <a href='/tab/event'>More</a>
                    </IonButtons>
                </IonToolbar>
                <IonList>
                    <a href='/tab/event'>
                        <div className="event">
                            <div className="eventinfo">
                                <IonLabel>Event Name</IonLabel>
                                <IonLabel>Desription</IonLabel>
                            </div>
                            <IonImg src={catergorys.cat2.src} style={{ width: '10%' }} />
                        </div>
                    </a>
                    <a href='/tab/event'>
                        <div className="event">
                            <div className="eventinfo">
                                <IonLabel>Event Name</IonLabel>
                                <IonLabel>Desription</IonLabel>
                            </div>
                            <IonImg src={catergorys.cat2.src} style={{ width: '10%' }} />
                        </div>
                    </a>
                    <a href='/tab/event'>
                        <div className="event">
                            <div className="eventinfo">
                                <IonLabel>Event Name</IonLabel>
                                <IonLabel>Desription</IonLabel>
                            </div>
                            <IonImg src={catergorys.cat2.src} style={{ width: '10%' }} />
                        </div>
                    </a>
                </IonList>
                <IonToolbar>
                    <IonLabel>Job</IonLabel>
                    <IonButtons slot="end">
                        <a href='/tab/event'>More</a>
                    </IonButtons>
                </IonToolbar>
                <IonList>
                    <a href='/tab/event'>
                        <div className="event">
                            <div className="eventinfo">
                                <IonLabel>Job Name</IonLabel>
                                <IonLabel>Desription</IonLabel>
                            </div>
                            <IonImg src={catergorys.cat2.src} style={{ width: '10%' }} />
                        </div>
                    </a>
                    <a href='/tab/event'>
                        <div className="event">
                            <div className="eventinfo">
                                <IonLabel>Job Name</IonLabel>
                                <IonLabel>Desription</IonLabel>
                            </div>
                            <IonImg src={catergorys.cat2.src} style={{ width: '10%' }} />
                        </div>
                    </a>
                    <a href='/tab/event'>
                        <div className="event">
                            <div className="eventinfo">
                                <IonLabel>Job Name</IonLabel>
                                <IonLabel>Desription</IonLabel>
                            </div>
                            <IonImg src={catergorys.cat2.src} style={{ width: '10%' }} />
                        </div>
                    </a>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
