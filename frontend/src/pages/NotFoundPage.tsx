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

const NotFoundPage: React.FC = () => {
  let title = "We're sorry";
  let content =
    "The page you requested could not be found. Please go back to the homepage.";
  let img = "../img/notFoundPage.png";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonImg src={img} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
            <IonLabel>{content}</IonLabel>
          </IonToolbar>
        </IonHeader>
        <IonButton routerLink={"/login"}>Return to Homepage</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
