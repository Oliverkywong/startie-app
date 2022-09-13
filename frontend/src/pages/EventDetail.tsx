import {
  IonPage,
  IonHeader,
  IonImg,
  IonButton,
  IonBackButton,
  IonButtons,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import eventimg from "../img/com1.png";

export default function EventDetail() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/event" />
          </IonButtons>
        </IonToolbar>
        <IonImg src={eventimg} style={{ width: "100%" }} />
      </IonHeader>
      <div className="tag">
        Event Tag
        <span>View</span>
        <span>View</span>
      </div>
      <div>
        <p>「智創商機 Make IT HappenJ Hackathon大賽</p>
        <p>2019.10.10</p>
        <p>
          本計劃目標對象為對創科有熱誠、有志投身於創新
          科技業或初創青年，以提供培訓工作坊及透過
          HACKATHON極客大賽，推動他們積極思考及協助
          解決疫情下的營商問題，為推動社會經濟出一分
          力，並藉此向大眾推廣香港創科業及可持續發展目 標。
        </p>
      </div>
      <IonButton>Join</IonButton>
    </IonPage>
  );
}
