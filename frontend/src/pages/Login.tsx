import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import logo from "../img/StartieLogo.png";
import {
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  personOutline,
} from "ionicons/icons";
import { useForm } from "react-hook-form";
import "./css/Login.css";
import { useDispatch } from "react-redux";
import { loggedIn } from "../redux/auth/action";
import { loadUserInfo } from "../redux/userInfo/action";
import { API_ORIGIN } from "../utils/api";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const router = useIonRouter();
  const [present] = useIonToast();

  return (
    <IonPage>
      <IonContent className="background">
        <div className="pageContent">
          <IonImg src={logo} className="logo" />
          <h1>Hey, Welcome Back!</h1>
          <form
            onSubmit={handleSubmit(async (data) => {
              const res = await fetch(
                `${API_ORIGIN}/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                }
              );

              const userRecord = await res.json();
              if (res.status === 200) {
                dispatch(loggedIn(userRecord["user"], userRecord["jwt"]));
                dispatch(loadUserInfo(userRecord["user"]));
                router.push("/tab/home");
              } else {
                present({
                  message: userRecord.msg,
                  duration: 1500,
                  position: "middle",
                  cssClass: "backtoast"
                })
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
            <input className="loginButton" type="submit" value={"Continue"} />
          </form>
          <a href="#">Forgot Password?</a>
          <div className="signup">
            <p>
              New to Startie?
              <span
                style={{ color: "#4fc564" }}
                onClick={() => {
                  // window.location.replace('/signup')
                  router.push("/signup");
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
          <IonButton
            onClick={() => {
              // window.location.replace('/sociallogin')
              router.push("/sociallogin");
            }}
          >
            Social Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
