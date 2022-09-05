import { IonPage, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Route, Redirect } from 'react-router'
import PasswordStrengthMeter from './PasswordStrengthMeter'
import UserFollows from './UserFollows'

export default function UserSettings() {
    return (
        // <IonPage>
        <div>
            <h1 style={{color: 'white'}}>UserSettings</h1>
            <PasswordStrengthMeter/>
            {/* <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tab6" component={UserFollows} />
        <Redirect exact from="/" to="/tab6" />
      </IonRouterOutlet>
    </IonReactRouter> */}
        </div>
        
        // </IonPage>
    )
}
