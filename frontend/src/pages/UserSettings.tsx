import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonBackButton, IonButton, IonToolbar, IonTitle, IonButtons, IonToggle } from '@ionic/react'
import React from 'react'
import { logOut } from '../redux/auth/action';
import { useAppDispatch } from '../store';


const UserSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/tab/profile" />
                        </IonButtons>
                        <IonTitle>User Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <IonItem>
                        <IonToggle checked={true} onIonChange={e => false} />
                        <IonLabel>New Post</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonToggle checked={true} onIonChange={e => false} />
                        <IonLabel>New Call</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonToggle checked={true} onIonChange={e => false} />
                        <IonLabel>New Hired</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonToggle checked={true} onIonChange={e => false} />
                        <IonLabel>Reject</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonToggle checked={true} onIonChange={e => false} />
                        <IonLabel>New Post</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonToggle checked={true} onIonChange={e => false} />
                        <IonLabel>New Post</IonLabel>
                    </IonItem>
                </IonList>
                <IonButton color="danger" onClick={() => {
                }}>Delect Account</IonButton>
                <IonButton color="danger" onClick={() => {
                    dispatch(logOut());
                    window.location.replace('/login');
                }}>Log Out</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default UserSettings
