import React, { useState } from 'react'
import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonBackButton, IonSearchbar, IonButton, IonCard, IonCardContent, IonImg, useIonViewWillEnter, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react'

import team1 from '../img/team1.png'
import team2 from '../img/team2.png'

const Team: React.FC = () => {
    const [data, setData] = useState<string[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

    const pushData = () => {
        const max = data.length + 30;
        const min = max - 30;
        const newData = [];
        for (let i = min; i < max; i++) {
            newData.push('ion-item in a card, icon left, button right' + i);
        }

        setData([
            ...data,
            ...newData
        ]);
    }
    const loadData = (ev: any) => {
        setTimeout(() => {
            pushData();
            console.log('Loaded data');
            ev.target.complete();
            if (data.length === 100) {
                setInfiniteDisabled(true);
            }
        }, 500);
    }

    useIonViewWillEnter(() => {
        pushData();
    });
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonSearchbar placeholder="Search" />
                </IonHeader>
                {/* <IonCard>
            <IonItem>
              <IonImg src={team1} />
              <IonLabel>ion-item in a card, icon left, button right</IonLabel>
              <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
            <IonCardContent>
              This is content, without any paragraph or header tags,
              within an ion-cardContent element.
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonItem>
              <IonImg src={team2} />
              <IonLabel>ion-item in a card, icon left, button right</IonLabel>
              <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
            <IonCardContent>
              This is content, without any paragraph or header tags,
              within an ion-cardContent element.
            </IonCardContent>
          </IonCard> */}

                <IonContent>
                    <IonList>
                        {data.map((item, index) => {
                            return (
                            <IonCard key={index}>
                                <IonItem>
                                  <IonImg src={team1} />
                                  <IonLabel>{item}</IonLabel>
                                  <IonButton fill="outline" slot="end">View</IonButton>
                                </IonItem>
                                <IonCardContent>
                                  This is content, without any paragraph or header tags,
                                  within an ion-cardContent element.
                                </IonCardContent>
                              </IonCard>
                              )
                        })}
                    </IonList>
                    <IonInfiniteScroll
                        onIonInfinite={loadData}
                        threshold="100px"
                        disabled={isInfiniteDisabled}
                    >
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Loading more data..."
                        ></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonContent>
            </IonContent>
        </IonPage>
    )
}
export default Team