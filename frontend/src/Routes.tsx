import React from 'react'
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { homeOutline, planetOutline, addCircleOutline, chatbubbleEllipsesOutline, personOutline } from 'ionicons/icons'
import { Redirect, Route } from 'react-router'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Team from './pages/Team'
import UserSettings from './pages/UserSettings'
import BuildTeam from './pages/BuildTeam'

export default function Routes() {

    return (
        <IonRouterOutlet>

            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/buildteam" component={BuildTeam} />

            <Route path="/tab">
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/tab/home" component={Homepage} />
                        <Route path="/tab/team" component={Team} />
                        <Route path="/tab/profile" component={Profile} />
                        <Route path="/tab/settings" component={UserSettings} />
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
                        <IonTabButton tab="tab4" href="/tab/tab4">
                            <IonIcon icon={chatbubbleEllipsesOutline} />
                            <IonLabel>Chat</IonLabel>
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
    )
}


