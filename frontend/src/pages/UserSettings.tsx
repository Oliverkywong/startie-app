import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonBackButton, IonButton, IonToolbar, IonTitle, IonButtons } from '@ionic/react'
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
                        <IonLabel>Username</IonLabel>
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
