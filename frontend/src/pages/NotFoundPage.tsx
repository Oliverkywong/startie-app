import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
  } from '@ionic/react'
  
  const NotFoundPage: React.FC = () => {
    let title = 'Page Not Found'
    const router = useIonRouter()
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
  
          <IonButton routerLink={'/'}>Back to Home</IonButton>
  
          {/* <pre>
            <code>{JSON.stringify(router.routeInfo, null, 2)}</code>
          </pre> */}
        </IonContent>
      </IonPage>
    )
  }
  
  export default NotFoundPage
  