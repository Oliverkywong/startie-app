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
} from "@ionic/react";
import { logoApple, logoGoogle } from "ionicons/icons";
import { GooglePlus } from "@awesome-cordova-plugins/google-plus";
import "./css/Login.css";

export default function SocialLogin() {

  const router = useIonRouter();

  // async function appleLogin() {
  //   //@ts-ignore
  //   SignInWithApple.signin({
  //     requestedScopes: [
  //       ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
  //       ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail,
  //     ],
  //   })
  //     .then((res: AppleSignInResponse) => {
  //       fetch(`${process.env.REACT_APP_BACKEND_URL}/login/apple`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(res),
  //       });
  //       // console.log(res)
  //     })
  //     .catch((error: AppleSignInErrorResponse) => {
  //       alert(error.code + " " + error.localizedDescription);
  //       console.error(error);
  //     });
  // }

  async function appleLogin() {
    //@ts-ignore
    SignInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail,
      ],
    })
      .then((res: AppleSignInResponse) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/login/apple`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        });
        console.log(res)
        
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
      .then((res) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/login/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        });
        // console.log(res)
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <IonPage>
      <IonContent className="background">
        <div className="sociallogin">
        <IonButton color="dark" onClick={appleLogin}>
          <IonIcon icon={logoApple} />
          Sign in with Apple
        </IonButton>
        <IonButton color="dark" onClick={googleLogin}>
          <IonIcon icon={logoGoogle} />
          Sign in with Google
        </IonButton>
        <IonButton onClick={() => { router.push("/tab/login") }}>Go Back</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
