import React from "react";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import {
  homeOutline,
  planetOutline,
  addCircleOutline,
  chatbubbleEllipsesOutline,
  personOutline,
} from "ionicons/icons";
import { Route } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import TeamList from "./pages/TeamList";
import EventList from "./pages/EventList";
import UserSettings from "./pages/UserSettings";
import BuildTeam from "./pages/BuildTeam";
import EventDetail from "./pages/EventDetail";
import TeamDetail from "./pages/TeamDetail";
import SearchPage from "./pages/SearchPage";
import UserList from "./pages/UserList";
import Notification from "./pages/Notification";
import Recommend from "./pages/Recommend";
import UserEdit from "./pages/UserEdit";
import SocialLogin from "./pages/SocialLogin";

export default function Routes() {
  return (
    <IonRouterOutlet>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/search" component={SearchPage} />
      <Route path="/notification" component={Notification} />
      <Route path="/recommend" component={Recommend} />
      <Route path="/sociallogin" component={SocialLogin} />

      <Route path="/tab">
        <IonTabs>
          <IonRouterOutlet>
            {/* <Route exact path="/" render={() => <Redirect to="/tab/home" />} /> */}

            <Route exact path="/tab/home" component={Homepage} />

            <Route exact path="/tab/team" component={TeamList} />
            <Route exact path="/tab/buildteam" component={BuildTeam} />
            <Route exact path="/tab/team/:id" component={TeamDetail} />

            <Route exact path="/tab/event" component={EventList} />
            <Route exact path="/tab/event/:id" component={EventDetail} />

            <Route exact path="/tab/profile" component={Profile} />
            <Route exact path="/tab/profile/edit" component={UserEdit} />
            {/* <Route exact path="/tab/user/:id" component={User} /> */}
            <Route exact path="/tab/user" component={UserList} />

            <Route path="/tab/settings" component={UserSettings} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/tab/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="team" href="/tab/team">
              <IonIcon icon={planetOutline} />
              <IonLabel>Team</IonLabel>
            </IonTabButton>
            <IonTabButton tab="buildteam" href="/tab/buildteam">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Build New Team</IonLabel>
            </IonTabButton>
            <IonTabButton tab="event" href="/tab/event">
              <IonIcon icon={chatbubbleEllipsesOutline} />
              <IonLabel>Event</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/tab/profile">
              <IonIcon icon={personOutline} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </Route>
      <Route component={NotFoundPage} />
    </IonRouterOutlet>
  );
}
