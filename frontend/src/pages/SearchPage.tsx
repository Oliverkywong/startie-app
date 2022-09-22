import {
  IonPage,
  IonHeader,
  IonSearchbar,
  IonButtons,
  useIonRouter,
  IonButton,
  IonToolbar,
  IonLabel,
  IonContent,
  IonIcon,
  IonChip,
  IonImg,
  IonList,
  IonBackButton,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
} from "@ionic/react";
import { search } from "ionicons/icons";
import { useState } from "react";
import { Team } from "../model";
// import { flameOutline, trashOutline } from "ionicons/icons";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import cat1 from "../img/cat1.png";
// import cat2 from "../img/cat2.png";
// import cat3 from "../img/cat3.png";
// import "swiper/css";

  // const catergorys = {
  //   cat1: { src: cat1, title: "NFT Team" },
  //   cat2: { src: cat2, title: "Business Team" },
  //   cat3: { src: cat3, title: "Insevment Team" },
  // };
export default function SearchPage() {

  const router = useIonRouter();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<Team[]>([]);

  const searchfetch = async (e:{target: {value: string}}) => {
    setSearchText(e.target.value)
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/team/?${searchText}`
    );
    const result = await res.json();
    console.log(result);
    setData(result);
    // setData(result.events);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonIcon size="large" icon={search} />
          <input placeholder="Search" onChange={searchfetch} />
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setSearchText('')}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div className="teamList homePageTeamList">
            {data.map((item) => {
              return (
                <IonCol key={item.id}>
                  <div className="teamInfo">
                    <IonCard
                      className="teamCard"
                      routerLink={`/tab/team/${item.id}`}
                    >
                      <img
                        className="teamIcon"
                        src={
                          item?.profilepic != null
                            ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                      />

                      <IonCardTitle className="teamTitle">
                        {item.name}
                      </IonCardTitle>

                      <IonCardContent className="teamContent">
                        {item.description}
                      </IonCardContent>

                      <div className="tag">
                        {item.tags.map((tag) => {
                          return <span key={tag}>{tag}</span>;
                        })}
                      </div>
                    </IonCard>
                  </div>
                </IonCol>
              );
            })}
          </div>
       
      </IonContent>
    </IonPage>
  );
}
