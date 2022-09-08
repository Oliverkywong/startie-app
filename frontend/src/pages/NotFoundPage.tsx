import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  } from '@ionic/react'
  
  const NotFoundPage: React.FC = () => {
    let title = 'Page Not Found'
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonButton routerLink={'/login'}>Back to Home</IonButton>

        </IonContent>
      </IonPage>
    )
  }
  
  export default NotFoundPage
  