import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonBackButton, IonToolbar, IonTitle, IonButtons, IonImg } from '@ionic/react'
import React from 'react'
import logo from '../img/logo.png'
import './css/Notification.css'


const Notification: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tab/home" />
                        </IonButtons>
                        <IonTitle>Notification</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <IonItem>
                        <div className="note">
                            <div className="event">
                                <IonImg src={logo} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>note</IonLabel>
                                </div>
                            </div>
                            <IonLabel>time</IonLabel>
                        </div>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonItem>
                        <div className="note">
                            <div className="event">
                                <IonImg src={logo} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>note</IonLabel>
                                </div>
                            </div>
                            <IonLabel>time</IonLabel>
                        </div>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonItem>
                        <div className="note">
                            <div className="event">
                                <IonImg src={logo} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>note</IonLabel>
                                </div>
                            </div>
                            <IonLabel>time</IonLabel>
                        </div>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonItem>
                        <div className="note">
                            <div className="event">
                                <IonImg src={logo} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>note</IonLabel>
                                </div>
                            </div>
                            <IonLabel>time</IonLabel>
                        </div>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonItem>
                        <div className="note">
                            <div className="event">
                                <IonImg src={logo} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>note</IonLabel>
                                </div>
                            </div>
                            <IonLabel>time</IonLabel>
                        </div>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonItem>
                        <div className="note">
                            <div className="event">
                                <IonImg src={logo} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>note</IonLabel>
                                </div>
                            </div>
                            <IonLabel>time</IonLabel>
                        </div>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonItem>
                        <div className="note">
                            <div className="event">
                                <IonImg src={logo} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>note</IonLabel>
                                </div>
                            </div>
                            <IonLabel>time</IonLabel>
                        </div>
                    </IonItem>
                </IonList>
                <IonList>
                    <IonItem>
                        <div className="note">
                            <div className="event">
                                <IonImg src={logo} style={{ width: '10%' }} />
                                <div className="eventinfo">
                                    <IonLabel>Name</IonLabel>
                                    <IonLabel>note</IonLabel>
                                </div>
                            </div>
                            <IonLabel>time</IonLabel>
                        </div>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Notification
