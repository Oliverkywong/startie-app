import React, { useLayoutEffect, useState } from 'react'
import { IonContent, IonHeader, IonLabel, IonPage, useIonRouter } from '@ionic/react'
import { UserInfo } from '../model';
import { API_ORIGIN } from '../utils/api';

export default function Recommend() {
    const [data, setData] = useState<UserInfo[]>([]);
    const router = useIonRouter();

    useLayoutEffect(() => {
        (async function () {
            const res = await fetch(`${API_ORIGIN}/app/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
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
                                        src={
                                          item?.profilepic !== null
                                            ? (item?.profilepic).slice(0, 4) === "data"
                                              ? `${item.profilepic}`
                                              : `${API_ORIGIN}/userUploadedFiles/${item.profilepic}`
                                            : "https://www.w3schools.com/howto/img_avatar.png"
                                        }
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

                <button onClick={() => router.push('/tab/home')}>No Thanks</button>
            </IonContent>
        </IonPage>
    )
}
