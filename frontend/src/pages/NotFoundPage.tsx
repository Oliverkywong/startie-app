import {
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import img from "../img/notFoundPage.png";
import "./css/Common.css";

const NotFoundPage: React.FC = () => {
  let title = "We're sorry";
  let content =
    "The page you requested could not be found. Please go back to the homepage.";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonImg src={img} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonToolbar>
          <IonTitle size="large">{title}</IonTitle>
        </IonToolbar>
        <p className="aligCenter">{content}</p>
        <IonButton routerLink={"/tab/home"}>Return to Homepage</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
