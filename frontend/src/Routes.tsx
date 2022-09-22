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
  personOutline,
  logoOctocat,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
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
import StartupEventList from "./pages/StartupEventList";
import BusinessEventList from "./pages/BusinessEventList";
import HackathonEventList from "./pages/HackathonEventList";

export default function Routes() {
  const localtoken = localStorage.getItem("token");

  return (
    <IonRouterOutlet>
      <Redirect exact path="/" to="/tab/home" />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/notification" component={Notification} />
      <Route exact path="/recommend" component={Recommend} />
      <Route exact path="/sociallogin" component={SocialLogin} />
      <Route exact path="/settings" component={UserSettings} />
      <Route exact path="/useredit" component={UserEdit} />

      <Route path="/tab">
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab/home" component={Homepage} />
            <Route exact path="/tab/team" component={TeamList} />
            <Route exact path="/tab/buildteam" component={BuildTeam} />
            <Route exact path="/tab/team/:id" component={TeamDetail} />
            <Route exact path="/tab/event" component={EventList} />
            <Route
              exact
              path="/tab/event/category/startup"
              component={StartupEventList}
            />
            <Route
              exact
              path="/tab/event/category/business"
              component={BusinessEventList}
            />
            <Route
              exact
              path="/tab/event/category/hackathon"
              component={HackathonEventList}
            />
            <Route exact path="/tab/event/:id" component={EventDetail} />
            <Route exact path="/tab/profile" component={Profile} />
            <Route exact path="/tab/user" component={UserList} />
            <Route exact path="/tab/login" component={Login} />
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
            {localtoken ? (
              <IonTabButton tab="buildteam" href="/tab/buildteam">
                <IonIcon icon={addCircleOutline} />
                <IonLabel>Build Team</IonLabel>
              </IonTabButton>
            ) : (
              <IonTabButton tab="login" href="/tab/login">
                <IonIcon icon={addCircleOutline} />
                <IonLabel>Build Team</IonLabel>
              </IonTabButton>
            )}
            <IonTabButton tab="event" href="/tab/event">
              <IonIcon icon={logoOctocat} />
              <IonLabel>Event</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/tab/user">
              <IonIcon icon={personOutline} />
              <IonLabel>User</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </Route>
      <Route component={NotFoundPage} />
    </IonRouterOutlet>
  );
}
