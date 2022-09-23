import React, { useLayoutEffect, useState } from 'react'
import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonImg, IonLabel, IonList, IonPage, useIonRouter } from '@ionic/react'
import icon from '../img/tonystarkicon.png'
import { UserInfo } from '../model';

export default function Recommend() {
    const [data, setData] = useState<UserInfo[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const router = useIonRouter();

    useLayoutEffect(() => {
        (async function () {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
            console.log(result);
            setData(result.user.slice(0,4)); //remove.user after backend fix
        })();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonHeader>AI Suggestion</IonHeader>
            </IonHeader>
            <IonContent>
                <div className="teamList">
                    {data.map((item) => {
                        return (
                            <div className="teamInfo" key={item.id}>
                                <div
                                    className="teamCard"
                                    onClick={() => {
                                        router.push(`/tab/user/${item.id}`);
                                    }}
                                >
                                    <img
                                        className="teamIcon"
                                        src={`${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`}
                                    />

                                    <p className="teamTitle">{item.username}</p>

                                    <p className="teamContent">{item.shortDescription}</p>

                                    <div className="tag">
                                        {item.tags.map((tag) => {
                                            return <span key={tag}>{tag}</span>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <IonLabel onClick={() => router.push('tab/home')}>No Thanks</IonLabel>
            </IonContent>
        </IonPage>
    )
}
