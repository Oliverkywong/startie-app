import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonContent, IonSearchbar, IonCard, IonCardContent, IonImg, useIonViewWillEnter, IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonCol, IonRow, IonButtons, IonButton, useIonRouter } from '@ionic/react'

import team1 from '../img/team1.png'
import './css/Team.css'

interface Team {
    id: number,
    name: string,
    description: string,
    profilepic: string,
}

const Team: React.FC = () => {
    const [data, setData] = useState<Team[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const router = useIonRouter();
    // const [tag, setTag] = useState<string[]>([]);

    const loadData = (ev: any) => {
        setTimeout(() => {
            console.log('Loaded data');
            ev.target.complete();
            if (data.length === 100) {
                setInfiniteDisabled(true);
            }
        }, 500);
    }

    useEffect(() => {
        (async function () {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`);
            const result = await res.json();

            // console.log(result.team)
            // const teamtag = []
            // for (let i = 0; i < result.teamTags.length; i++) {
            //     teamtag.push(result.teamTags[i].name)
            // }
            // console.log(teamtag)
            // setTag(teamtag)
            setData(result.team);

        })()
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonSearchbar placeholder="Search" onClick={() => { router.push("/search") }} />
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        {data.map((item) => {
                            return (
                                <IonCol size='6' >
                                    <a href='/teamdetail'>
                                        <IonCard key={item.id} className="card">
                                            <IonImg src={item.profilepic} style={{ width: '100%' }} />
                                            <IonCardContent className='content' style={{ fontSize: '10px' }}>
                                                <p style={{ fontSize: '14px', color: 'white' }}>{item.name}</p><br />
                                                <p style={{ fontSize: '10px', color: 'white' }}>{item.description}</p>
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
export default Team