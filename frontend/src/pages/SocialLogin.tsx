import React from "react";
import {
  SignInWithApple,
  AppleSignInResponse,
  AppleSignInErrorResponse,
  ASAuthorizationAppleIDRequest,
} from "@awesome-cordova-plugins/sign-in-with-apple";
import {
  IonPage,
  IonButton,
  IonIcon,
  IonContent,
  useIonRouter,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { logoApple, logoGoogle } from "ionicons/icons";
import { GooglePlus } from "@awesome-cordova-plugins/google-plus";
import "./css/Login.css";
import { useDispatch } from "react-redux";
import { loggedIn } from "../redux/auth/action";
import { loadUserInfo } from "../redux/userInfo/action";
import { API_ORIGIN } from "../utils/api";

export default function SocialLogin() {

  const dispatch = useDispatch();
  const router = useIonRouter();

  async function appleLogin() {
    //@ts-ignore
    SignInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail,
      ],
    })
      .then(async(res: AppleSignInResponse) => {
        const data = await fetch(`${API_ORIGIN}/login/apple`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        });
        
        if (data.status === 200) {
          const userRecord = await data.json();
          
          dispatch(loggedIn(userRecord["user"], userRecord["jwt"]));
          dispatch(loadUserInfo(userRecord["user"]))
        router.push("/tab/home");
        }
      })
      .catch((error: AppleSignInErrorResponse) => {
        alert(error.code + " " + error.localizedDescription);
        console.error(error);
      });
  }

  async function googleLogin() {
    GooglePlus.login({
      webClientId:
        "270392848203-rib5h4897grjike2km2v76igv1gs194m.apps.googleusercontent.com",
      offline: true,
    })
      .then(async(res) => {
        const data = await fetch(`${API_ORIGIN}/login/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        });
       
        if (data.status === 200) {
          const userRecord = await data.json();
         
          dispatch(loggedIn(userRecord["user"], userRecord["jwt"]));
          dispatch(loadUserInfo(userRecord["user"]))
        router.push("/tab/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tab/home" />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
      <IonContent className="background">
        <div className="sociallogin">
        <IonButton color="dark" onClick={appleLogin}>
          <IonIcon icon={logoApple} />
          Sign in with Apple
        </IonButton>
        <IonButton onClick={googleLogin}>
          <IonIcon icon={logoGoogle} />
          Sign in with Google
        </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
