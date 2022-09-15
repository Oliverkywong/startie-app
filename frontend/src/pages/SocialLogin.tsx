import React from 'react'
import {
    SignInWithApple,
    AppleSignInResponse,
    AppleSignInErrorResponse,
    ASAuthorizationAppleIDRequest,
} from "@awesome-cordova-plugins/sign-in-with-apple";
import { IonPage, IonButton, IonIcon, IonNavLink } from '@ionic/react';
import { logoApple, logoGoogle } from 'ionicons/icons';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus';
import Login from './Login';

export default function SocialLogin() {
    async function appleLogin() {
        //@ts-ignore
        SignInWithApple.signin({
            requestedScopes: [
                ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
                ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
            ]
        }).then((res: AppleSignInResponse) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/login/apple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(res)
            })
            // console.log(res)
        }).catch((error: AppleSignInErrorResponse) => {
            alert(error.code + ' ' + error.localizedDescription);
            console.error(error);

        })
    }

    async function googleLogin() {
        GooglePlus.login({
            'webClientId': '270392848203-rib5h4897grjike2km2v76igv1gs194m.apps.googleusercontent.com',
            'offline': true
        }).then((res) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/login/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(res)
            })
            // console.log(res)
        }).catch((err) => {
            console.error(err);
        })
    }
    return (
        <IonPage className="background">
            <IonButton color="dark" onClick={appleLogin}>
                <IonIcon icon={logoApple} />
                Sign in with Apple
            </IonButton>
            <IonButton color="dark" onClick={googleLogin}>
                <IonIcon icon={logoGoogle} />
                Sign in with Google
            </IonButton>

            <IonNavLink routerDirection="forward" component={() => <Login />}>
          <IonButton>Login</IonButton>
        </IonNavLink>
        </IonPage>

    )
}
