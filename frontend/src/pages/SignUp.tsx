import React, { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import logo from "../img/StartieLogo.png";
import {
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  mailOutline,
  personOutline,
} from "ionicons/icons";
import { useForm } from "react-hook-form";
import "./css/SignUp.css";
import PasswordComplexity from "./PasswordComplexity";
import { useDispatch } from "react-redux";
import { loggedIn } from "../redux/auth/action";
import { loadUserInfo } from "../redux/userInfo/action";
import { API_ORIGIN } from "../utils/api";

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [present] = useIonToast();

  const password = watch("password");

  const router = useIonRouter();
  const dispatch = useDispatch();

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tab/home" />
        </IonButtons>
      </IonToolbar>
      <IonContent className="background">
        <div className="pageContent">
          <IonImg src={logo} className="logo" />
          <form
            onSubmit={handleSubmit(async (data) => {
              const res = await fetch(`${API_ORIGIN}/user`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              })

              const userRecord = await res.json();
              if (res.status === 200) {
                dispatch(loggedIn(userRecord["user"].user[0], userRecord["jwt"]));
                dispatch(loadUserInfo(userRecord["user"].user[0]));
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
                placeholder="User Name"
              />
            </div>
            <div className="email">
              <IonIcon icon={mailOutline} />
              <input
                className="emailInput"
                {...register("email")}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="password">
              <IonIcon icon={lockClosedOutline} />
              <input
                className="passwordInput"
                placeholder="Password"
                type={passwordShown ? "text" : "password"}
                {...register("password", {
                  required: "must have password",
                  minLength: {
                    value: 8,
                    message: "Please enter your password with 8 characters",
                  },
                })}
              />
              <IonIcon
                icon={passwordShown ? eyeOutline : eyeOffOutline}
                onClick={() => setPasswordShown(passwordShown ? false : true)}
              />
            </div>
            <PasswordComplexity password={password?.toString() ?? ""} />
            <div>
              <input type="checkbox" onChange={() => setCheckbox(!checkbox)} />
              <span>
                By Creating an account you accept the Terms & Condition of the
                Company
              </span>
            </div>
            <br />
            {checkbox && <button color="danger">Register</button>}
          </form>
          <div className="signup">
            <p>
              Already a member?
              <span
                style={{ color: "#4fc564" }}
                onClick={() => {
                  router.push("/tab/login");
                }}
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
