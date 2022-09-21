import React, { useState } from "react";
import {
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  useIonRouter
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

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const password = watch("password");


  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent className="background">
        <div className="pageContent">
          <IonImg src={logo} className="logo" />
          <form
            onSubmit={handleSubmit((data) => {
              // console.log(data);
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
            <input type="checkbox" onChange={() => setCheckbox(!checkbox)} />
            <span>
              By Creating an account you accept the Terms & Condition of the
              Company
            </span>
            <br />
            {checkbox && <button color="danger">Register</button>}
          </form>
          <div className="signup">
            <p>
              Already a member?
              <span />
              <span
                style={{ color: "#4fc564" }}
                onClick={() => { router.push("/tab/login") }}
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
