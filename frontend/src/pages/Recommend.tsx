import React from 'react'
import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonImg, IonLabel, IonList, IonPage } from '@ionic/react'
import icon from '../img/tonystarkicon.png'

export default function Recommend() {
    return (
        <IonPage>
            <IonHeader>
                <IonHeader>AI Suggestion</IonHeader>
            </IonHeader>
            <IonContent>
                <IonList>
                    <a href='#'>
                        <IonCard>
                            <div className="event">
                                <IonImg src={icon} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>Date</IonLabel>
                                </div>
                                <IonButton>INVITE</IonButton>
                            </div>
                            <IonCardContent>
                                Descrption
                            </IonCardContent>
                        </IonCard>
                    </a>
                    <a href='#'>
                        <IonCard>
                            <div className="event">
                                <IonImg src={icon} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>Date</IonLabel>
                                </div>
                                <IonButton>INVITE</IonButton>
                            </div>
                            <IonCardContent>
                                Descrption
                            </IonCardContent>
                        </IonCard>
                    </a>
                    <a href='#'>
                        <IonCard>
                            <div className="event">
                                <IonImg src={icon} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>Date</IonLabel>
                                </div>
                                <IonButton>INVITE</IonButton>
                            </div>
                            <IonCardContent>
                                Descrption
                            </IonCardContent>
                        </IonCard>
                    </a>
                    <a href='#'>
                        <IonCard>
                            <div className="event">
                                <IonImg src={icon} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>Date</IonLabel>
                                </div>
                                <IonButton>INVITE</IonButton>
                            </div>
                            <IonCardContent>
                                Descrption
                            </IonCardContent>
                        </IonCard>
                    </a>
                </IonList>
                <a href="/tab/home">No Thanks</a>
            </IonContent>
        </IonPage>
    )
}