import React, { useState } from "react";
import { IonButton, IonIcon, IonImg, IonPage, useIonRouter } from "@ionic/react";
import logo from "../img/StartieLogo.png";
import {
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  logoApple,
  personOutline,
} from "ionicons/icons";
import { useForm } from "react-hook-form";
import './css/Login.css'
import { useDispatch } from 'react-redux';
import { loggedIn } from '../redux/auth/action';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple';
// import { isPlatform } from '@ionic/react';
// import { Plugins } from '@capacitor/core'

// const IOS = isPlatform('ios');


const Login: React.FC = () => {

  async function appleLogin() {
   //@ts-ignore
    SignInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    }).then((res:AppleSignInResponse) => {
      fetch(`http://192.168.80.58:8000/login/apple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(res)
      })
      console.log("hi")
      console.log(res)
    }).catch((error:AppleSignInErrorResponse) => {
      alert(error.code + ' ' + error.localizedDescription);
      console.error(error);
  
    })
  }

  const { register, handleSubmit } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const router = useIonRouter();

  return (
    <IonPage className="background">
      <div className="pageContent">
        <IonImg src={logo} className="logo" />
        <h1>Hey, Welcome Back!</h1>
        <form
          onSubmit={handleSubmit(async (data) => {
            const res = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
             
            if (res.status === 200) {
              const userRecord = await res.json();
              // console.log(userRecord)
              dispatch(loggedIn(userRecord["user"], userRecord["jwt"]));
              localStorage.setItem("token", userRecord["jwt"]);
              router.push("/tab/home");
            }
          })}
        >
          <div className="username">
            <IonIcon icon={personOutline} />
            <input
              className="usernameInput"
              {...register("username")}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="password">
            <IonIcon icon={lockClosedOutline} />
            <input
              className="passwordInput"
              {...register("password")}
              placeholder="Password"
              type={passwordShown ? "text" : "password"}
            />
            <IonIcon
              icon={passwordShown ? eyeOutline : eyeOffOutline}
              onClick={() => setPasswordShown(passwordShown ? false : true)}
            />
            <br />
          </div>
          <button type="submit">Continue</button>
        </form>
        <a href="#">Forgot Password?</a>
        <div className="signup">
          <p>
            New to Startie?<a href="/signup">Sign Up</a>
          </p>
        </div>
        <IonButton color="dark" onClick={appleLogin}>
          <IonIcon icon={logoApple} />
          Sign in with Apple</IonButton>
      </div>
    </IonPage>
  );
};

export default Login;
