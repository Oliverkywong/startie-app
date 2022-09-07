import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonBackButton } from '@ionic/react'
import React from 'react'

export default function UserSettings() {
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonBackButton defaultHref="/tab5" />
                    User Settings
                </IonHeader>
                <IonList>
                    <IonItem>
                        <IonLabel>Username</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>


    )
}
