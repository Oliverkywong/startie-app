import React, { useState } from 'react'
import { IonPage, IonHeader, IonContent, IonSearchbar, IonCard, IonCardContent, IonImg, useIonViewWillEnter, IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonCol, IonRow } from '@ionic/react'

import icon from '../img/tonystarkicon.png'
import './css/Team.css'

const User: React.FC = () => {
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
                <IonGrid>
                    <IonRow>
                        {data.map((item, index) => {
                            return (
                                <IonCol size='6'>
                                    <a href='/teamdetail'>
                                        <IonCard key={index} className="card">
                                            <IonImg src={icon} style={{ width: '100%' }} />
                                            <IonCardContent className='content' style={{ fontSize: '10px' }}>
                                                <p style={{ fontSize: '14px', color: 'white' }}>Name</p><br />
                                                {item}
                                                <div className='tag'>
                                                    <span>View</span>
                                                    <span>View</span>
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </a>
                                </IonCol>
                            )
                        })}
                    </IonRow>
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

                </IonGrid>
            </IonContent>
        </IonPage>
    )
}
export default User