import {
  IonPage,
  IonHeader,
  IonButtons,
  useIonRouter,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { search, shareOutline } from "ionicons/icons";
import moment from "moment";
import { useState } from "react";
import { Team, UserInfo, EventInfo } from "../model";
import { API_ORIGIN } from "../utils/api";
import "./css/Common.css";
import "./css/Team.css";
export default function SearchPage() {
  const router = useIonRouter();
  const [userdata, setUserData] = useState<UserInfo[]>([]);
  const [teamdata, setTeamData] = useState<Team[]>([]);
  const [eventdata, setEventData] = useState<EventInfo[]>([]);
  const [user, setUser] = useState(true);
  const [team, setTeam] = useState(false);
  const [event, setEvent] = useState(false);

  const searchfetch = async (e: { target: { value: string } }) => {
    const searchText = e.target.value;
    const teamreq = searchText.replace(/[^a-zA-Z ]/g, "");
    const teamres = await fetch(`${API_ORIGIN}/app/team/?q=${teamreq}`);
    const teamresult = await teamres.json();
    console.log(teamresult);

    setTeamData(teamresult.teams);

    const userreq = searchText.replace(/[^a-zA-Z ]/g, "");
    const userres = await fetch(`${API_ORIGIN}/app/user/?q=${userreq}`);
    const userresult = await userres.json();
    setUserData(userresult.user);

    const eventreq = searchText.replace(/[^a-zA-Z ]/g, "");
    const eventres = await fetch(`${API_ORIGIN}/app/event/?q=${eventreq}`);
    const eventresult = await eventres.json();
    setEventData(eventresult.events);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          {/* <IonIcon icon={search} /> */}
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
                      src={
                        item?.profilepic !== null
                          ? (item?.profilepic).slice(0, 4) === "data"
                            ? `${item.profilepic}`
                            : `${API_ORIGIN}/userUploadedFiles/${item.profilepic}`
                          : "https://www.w3schools.com/howto/img_avatar.png"
                      }
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
                <div
                  key={item.id}
                  className="teamInfo"
                  onClick={() => {
                    router.push(`/tab/team/${item.id}`);
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

                  <p className="teamTitle">{item.name}</p>

                  <p className="teamContent">{item.shortDescription}</p>

                  <span className="teamLookingFor">Looking for: </span>

                  <div className="tag">
                    {item.tags.map((tag) => {
                      return <span key={tag}>{tag}</span>;
                    })}
                  </div>

                  <div className="shareButton">
                    <IonIcon icon={shareOutline} />
                  </div>
                </div>
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
                    router.push(`/tab/event/${item.id}`);
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
                    <img
                      src={
                        item?.event_profilepic !== null
                          ? (item?.event_profilepic).slice(0, 4) === "data"
                            ? `${item.event_profilepic}`
                            : `${API_ORIGIN}/userUploadedFiles/${item.event_profilepic}`
                          : "https://www.w3schools.com/howto/img_avatar.png"
                      }
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div>
                      <p className="eventDescription">{item.description}</p>
                      <p className="eventDate">
                        Due: {moment(item.starttime).format("DD/MM/YYYY")}
                      </p>
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
