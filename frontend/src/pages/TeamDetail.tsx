import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import team from '../img/team1.png'
import icon from '../img/tonystarkicon.png'

export default function TeamDetail() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tab/team" />
                    </IonButtons>
                </IonToolbar>
                <IonImg src={team} style={{ width: '100%' }} />
            </IonHeader>
            <div className='tag'>
                Team Tag
                <span>View</span>
                <span>View</span>
            </div>
            <div>
                <p>EasyJobs 職騰</p>
                <p>「職騰 APP (Easyjobs)」目標成為是
                    亞洲區第一個專為大專生而設的專業
                    人力資源服務機構</p>
            </div>
            <IonButton>Join</IonButton>
            <IonContent>
                <IonList>
                    <div className="event">
                        <IonImg src={icon} style={{ width: '10%' }} />
                        <div className="eventinfo">
                            <IonLabel>Name</IonLabel>
                            <IonLabel>Descrption</IonLabel>
                        </div>
                    </div>
                    <div className="event">
                        <IonImg src={icon} style={{ width: '10%' }} />
                        <div className="eventinfo">
                            <IonLabel>Name</IonLabel>
                            <IonLabel>Descrption</IonLabel>
                        </div>
                    </div>
                    <div className="event">
                        <IonImg src={icon} style={{ width: '10%' }} />
                        <div className="eventinfo">
                            <IonLabel>Name</IonLabel>
                            <IonLabel>Descrption</IonLabel>
                        </div>
                    </div>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
