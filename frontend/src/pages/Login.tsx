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
import "./css/Login.css";
import { useDispatch } from "react-redux";
import { loggedIn } from "../redux/auth/action";

const Login: React.FC = () => {

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
              // router.push("/tab/home");
              window.location.replace('/tab/home');
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
          <input
            className="loginButton"
            type="submit"
            value={"Continue"}
          ></input>
        </form>
        <a href="#">Forgot Password?</a>
        <div className="signup">
          <p>
            New to Startie?<a href="/signup">Sign Up</a>
          </p>
        </div>
        {/* <IonButton onClick={()=>router.push('/sociallogin')}> */}
        <a href='/sociallogin'>Social Login</a>
        {/* </IonButton> */}
      </div>
    </IonPage>
  );
};

export default Login;
