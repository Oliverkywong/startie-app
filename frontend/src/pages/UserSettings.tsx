import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonBackButton } from '@ionic/react'
import React from 'react'

export default function UserSettings() {
    return (
        <IonPage>
            <IonHeader>
                <IonBackButton defaultHref="/tab5" />
                User Settings
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel>Username</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>


    )
}
