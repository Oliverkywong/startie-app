import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonNavLink,
  IonPage,
  useIonRouter,
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
import SocialLogin from "./SocialLogin";
import SignUp from "./SignUp";
import { RootState, useAppSelector } from "../store";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const router = useIonRouter();
  const token = useAppSelector((state: RootState) => state.auth.token);

  return (
    <IonPage className="background">
      <IonContent>
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
                console.log(userRecord);
                dispatch(loggedIn(userRecord["user"], userRecord["jwt"]));
                // localStorage.setItem("token", userRecord["jwt"]);
                router.push("/tab/home");
                // window.location.replace("/tab/home");
                // <IonNavLink component={() => <Homepage />} ></IonNavLink>
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
              New to Startie? <span />
              <IonNavLink
                style={{ color: "#4fc564" }}
                routerDirection="forward"
                component={() => <SignUp />}
              >
                Sign Up
              </IonNavLink>
            </p>
          </div>
          <IonNavLink
            routerDirection="forward"
            component={() => <SocialLogin />}
          >
            <IonButton>Social Login</IonButton>
          </IonNavLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
