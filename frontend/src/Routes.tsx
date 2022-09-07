import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { homeOutline, planetOutline, addCircleOutline, chatbubbleEllipsesOutline, personOutline } from 'ionicons/icons'
import React from 'react'
import { Route } from 'react-router'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Tab3 from './pages/Tab3'
import UserSettings from './pages/UserSettings'

export default function Routes() {

    return (
        <>
            <Route path="/" component={Login} />
            <Route path="/signup" component={SignUp} />

            <Route path="/tab">
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/tab/home" component={Homepage} />
                        <Route path="/tab/profile" component={Profile} />
                        <Route path="/tab/settings" component={UserSettings} />
                    </IonRouterOutlet>

                    {/* <Route path="/">
                        <Login />
                    </Route> */}
                    {/* <Route path="/tab/home">
                        <Homepage />
                    </Route>
                    <Route path="tab/tab2">
                    </Route>
                    <Route path="tab/tab3">
                        <Tab3 />
                    </Route>
                    <Route path="tab/tab4">
                    </Route>
                    <Route path="tab/tab5">
                        <Profile />
                    </Route>
                    <Route path="tab/tab6">
                        <UserSettings />
                    </Route>  */}
                    {/* <Route path="/login">
                            <Login />
                        </Route> */}
                    {/* </IonRouterOutlet> */}
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home" href="/tab/home">
                            <IonIcon icon={homeOutline} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab/tab2">
                            <IonIcon icon={planetOutline} />
                            <IonLabel>Team</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab/tab3">
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
            {/* <Route component={NotFoundPage} /> */}
        </>
    )
}


