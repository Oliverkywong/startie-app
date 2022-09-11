import React, { useState } from 'react'
import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonSearchbar, IonCard, IonCardContent, IonImg, useIonViewWillEnter, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react'

import team1 from '../img/team1.png'
import './css/Event.css'

const Event: React.FC = () => {
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
      <IonHeader>
        <IonSearchbar placeholder="Search" />
      </IonHeader>
      <IonContent>
        <IonList>
          {data.map((item, index) => {
            return (
              <a href='/eventdetail'>
                <IonCard key={index}>
                  <IonItem>
                    <IonImg src={team1}/>
                  </IonItem>
                  <IonCardContent>
                    {item}
                  </IonCardContent>
                  <div className="event">
                    <IonImg src={team1} style={{ width: '10%' }} />
                    <div className="eventinfo">
                      <IonLabel>Name</IonLabel>
                      <IonLabel>Date</IonLabel>
                    </div>
                  </div>
                </IonCard>
              </a>
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
    </IonPage>
  )
}
export default Event