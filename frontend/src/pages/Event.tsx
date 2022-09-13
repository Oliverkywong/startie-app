import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonSearchbar, IonCard, IonCardContent, IonImg, useIonViewWillEnter, IonInfiniteScroll, IonInfiniteScrollContent, useIonRouter } from '@ionic/react'

import './css/Event.css'

interface Event {
    id: number,
    name: string,
    description: string,
    profilepic: string,
    created_at: string,
}

const Event: React.FC = () => {
  const [data, setData] = useState<Event[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();


  useEffect(() => {
    (async function () {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/event`);
        const result = await res.json();
        console.log(result)
        setData(result);
    })()
}, [])

  const loadData = (ev: any) => {
    setTimeout(() => {
      console.log('Loaded data');
      ev.target.complete();
      if (data.length === 100) {
        setInfiniteDisabled(true);
      }
    }, 500);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonSearchbar placeholder="Search" onClick={() => { router.push("/search") }} />
      </IonHeader>
      <IonContent>
        <IonList>
          {data.map((item) => {
            return (
              <a href='/eventdetail'>
                <IonCard key={item.id}>
                  <IonItem>
                    <IonImg src={item.profilepic} />
                  </IonItem>
                  <IonCardContent>
                    {item.description}
                  </IonCardContent>
                  <div className="event">
                    <IonImg src={item.profilepic} style={{ width: '10%' }} />
                    <div className="eventinfo">
                      <IonLabel>{item.name}</IonLabel>
                      <IonLabel>{item.created_at}</IonLabel>
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