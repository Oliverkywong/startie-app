import {
  IonPage,
  IonHeader,
  IonButtons,
  useIonRouter,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonImg,
} from "@ionic/react";
import { search } from "ionicons/icons";
import { useState } from "react";
import { Team, UserInfo, EventInfo } from "../model";
import { API_ORIGIN } from "../utils/api";
export default function SearchPage() {
  const router = useIonRouter();
  const [searchText, setSearchText] = useState("");
  const [userdata, setUserData] = useState<UserInfo[]>([]);
  const [teamdata, setTeamData] = useState<Team[]>([]);
  const [eventdata, setEventData] = useState<EventInfo[]>([]);
  const [user, setUser] = useState(true);
  const [team, setTeam] = useState(false);
  const [event, setEvent] = useState(false);

  const searchfetch = async (e: { target: { value: string } }) => {
    setSearchText(e.target.value);
    const teamreq = searchText.replace(/[^a-zA-Z ]/g, "");
    const teamres = await fetch(
      `${API_ORIGIN}/app/team/?${teamreq}`
    );
    const teamresult = await teamres.json();
    // console.log(teamresult);
    setTeamData(teamresult.teams.rows);

    const userreq = searchText.replace(/[^a-zA-Z ]/g, "");
    const userres = await fetch(
      `${API_ORIGIN}/app/user/?${userreq}`
    );
    const userresult = await userres.json();
    // console.log(userresult.user);
    setUserData(userresult.user);

    const eventreq = searchText.replace(/[^a-zA-Z ]/g, "");
    const eventres = await fetch(
      `${API_ORIGIN}/app/event/?${eventreq}`
    );
    const eventresult = await eventres.json();
    // console.log(eventresult.events);
    setEventData(eventresult.events);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <input
            className="searchbar"
            placeholder="Search"
            onChange={searchfetch}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegment>
          <IonSegmentButton
            value="User"
            onClick={() => {
              setUser(true);
              setTeam(false);
              setEvent(false);
            }}
          >
            <IonLabel>User</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="Team"
            onClick={() => {
              setUser(false);
              setTeam(true);
              setEvent(false);
            }}
          >
            <IonLabel>Team</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="Event"
            onClick={() => {
              setUser(false);
              setTeam(false);
              setEvent(true);
            }}
          >
            <IonLabel>Event</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonItem>
          <IonLabel>Search Results</IonLabel>
        </IonItem>

        {user && (
          <div className="teamList">
            {userdata.map((item) => {
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
                      src={`${API_ORIGIN}/userUploadedFiles/${item.profilepic}`}
                    />

                    <p className="teamTitle">{item.username}</p>

                    <p className="teamContent">{item.description}</p>

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
        )}

        {team && (
          <div className="teamList homePageTeamList">
            {teamdata.map((item) => {
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
                            ? `${API_ORIGIN}/userUploadedFiles/${item.profilepic}`
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
        )}

        {event && (
          <div className="eventContainer">
            {eventdata.map((item) => {
              return (
                <div
                  className="eventinfo"
                  key={item.id}
                  onClick={() => {
                    router.push(`event/${item.id}`);
                  }}
                >
                  <img
                    className="eventThumbnail"
                    src={
                      item?.event_profilepic != null
                        ? `${API_ORIGIN}/userUploadedFiles/${item.event_profilepic}`
                        : "StartieLogo.png"
                    }
                  />

                  <p className="eventTitle">{item.event_name}</p>
                  <div className="eventData">
                    <IonImg
                      src={
                        item?.event_provider_profile_pic != null
                          ? `${API_ORIGIN}/userUploadedFiles/${item.event_provider_profile_pic}`
                          : "StartieLogo.png"
                      }
                      style={{ width: "10%", height: "10%" }}
                    />
                    <div className="">
                      <p className="eventDescription">{item.description}</p>
                      <p className="eventDate">Due: {item.starttime}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
