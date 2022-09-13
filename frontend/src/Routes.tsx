import React from "react";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
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
import Team from "./pages/Team";
import Event from "./pages/Event";
import UserSettings from "./pages/UserSettings";
import BuildTeam from "./pages/BuildTeam";
import EventDetail from "./pages/EventDetail";
import TeamDetail from "./pages/TeamDetail";
import SearchPage from "./pages/SearchPage";
import User from "./pages/User";
import Notification from "./pages/Notification";
import Recommend from "./pages/Recommend";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function Routes() {
  return (
    <IonRouterOutlet>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/buildteam" component={BuildTeam} />
      <Route path="/eventdetail" component={EventDetail} />
      <Route path="/teamdetail" component={TeamDetail} />
      <Route path="/search" component={SearchPage} />
      <Route path="/notification" component={Notification} />
      <Route path="/recommend" component={Recommend} />

      <Route path="/tab">
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/tab/home" component={Homepage} />
            <Route path="/tab/team" component={Team} />
            <Route path="/tab/event" component={Event} />
            <Route path="/tab/profile" component={Profile} />
            <Route path="/tab/settings" component={UserSettings} />
            <Route path="/tab/user" component={User} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/tab/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab/team">
              <IonIcon icon={planetOutline} />
              <IonLabel>Team</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/buildteam">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Build New Team</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/tab/event">
              <IonIcon icon={chatbubbleEllipsesOutline} />
              <IonLabel>Event</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab5" href="/tab/profile">
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
