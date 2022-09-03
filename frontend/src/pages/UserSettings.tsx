import { IonPage, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Route, Redirect } from 'react-router'
import UserFollows from './UserFollows'

export default function UserSettings() {
    return (
        <div>
            <h1 style={{color: 'white'}}>UserSettings</h1>
            
            {/* <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/dashboard" component={UserFollows} />
        <Redirect exact from="/" to="/dashboard" />
      </IonRouterOutlet>
    </IonReactRouter> */}
        </div>
    )
}
