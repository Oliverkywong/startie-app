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
import Homepage from "./Homepage";
import SignUp from "./SignUp";
import { RootState, useAppSelector } from "../store";
import { Redirect } from "react-router";
// import { useHistory } from "react-router";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  // const [uresname, setUresname] = useState("");
  // const [upassword, setUpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const router = useIonRouter();

    if (res.status === 200) {
      const userRecord = await res.json();
      console.log(userRecord)
      dispatch(loggedIn(userRecord["user"], userRecord["jwt"]));
      // localStorage.setItem("token", userRecord["jwt"]);
      router.push("/tab/home");
      // window.location.replace('/tab/home');
      // <IonNavLink component={() => <Homepage />} ></IonNavLink>
    }

  }
  return (
    <IonPage className="background">
      <IonContent>
      <div className="pageContent">
        <IonImg src={logo} className="logo" />
        <h1>Hey, Welcome Back!</h1>
        {/* {token?<Redirect to={'/tab/home'}/>:null} */}

        <form
          onSubmit={handleSubmit(async (data) => {
            await login(data);
   
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
            />
        </form>
        {/* <form onSubmit={async(e)=>{
          e.preventDefault();
           const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({username:uresname,password:upassword}),
            }
          );

    if (res.status === 200) {
      const userRecord = await res.json();
      console.log(userRecord)
      dispatch(loggedIn(userRecord["user"], userRecord["jwt"]));
      // localStorage.setItem("token", userRecord["jwt"]);
      router.push("/tab/home");
      // window.location.replace('/tab/home');
      // <IonNavLink component={() => <Homepage />} ></IonNavLink>
    }

  }
  return (
    <IonPage className="background">
      <IonContent>
<<<<<<< HEAD
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
                // window.location.replace('/tab/home');
                // <IonNavLink component={() => <SignUp />} ></IonNavLink>
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
            {/* <IonNavLink className="nav" routerDirection="forward" component={() => <Homepage />} > */}
            <input className="loginButton" type="submit" value={"Continue"} />
            {/* </IonNavLink> */}
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
=======
      <div className="pageContent">
        <IonImg src={logo} className="logo" />
        <h1>Hey, Welcome Back!</h1>
        {/* {token?<Redirect to={'/tab/home'}/>:null} */}

        <form
          onSubmit={handleSubmit(async (data) => {
            await login(data);
   
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
            />
        </form>
        {/* <form onSubmit={async(e)=>{
          e.preventDefault();
           const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({username:uresname,password:upassword}),
            }
          );

          if (res.status === 200) {
            const userRecord = await res.json();
            // console.log(userRecord)
            dispatch(loggedIn(userRecord["user"], userRecord["jwt"]));
            localStorage.setItem("token", userRecord["jwt"]);
            // router.push("/tab/home");
            window.location.replace('/tab/home');
            // <IonNavLink component={() => <Homepage />} ></IonNavLink>
          }
        }
        }>
          <div className="username">
            <IonIcon icon={personOutline} />
            <input
              className="usernameInput"
              type="text"
              placeholder="Username"
              value={uresname}
              onChange={(e) => setUresname(e.target.value)}
            />
          </div>
          <div className="password">
            <IonIcon icon={lockClosedOutline} />
            <input
              className="passwordInput"
              placeholder="Password"
              type={passwordShown ? "text" : "password"}
              value={upassword}
              onChange={(e) => setUpassword(e.target.value)}
            />
            <IonIcon
              icon={passwordShown ? eyeOutline : eyeOffOutline}
              onClick={() => setPasswordShown(passwordShown ? false : true)}
            />
            <br />
          </div>
          <input
          type={"submit"}
            className="loginButton"
            value={"Continue"}
          />
        </form> */}
        <a href="#">Forgot Password?</a>
        <div className="signup">
          <p>
            New to Startie? <span />
            <IonNavLink style={{ color: '#4fc564' }} routerDirection="forward" component={() => <SignUp />}>
              Sign Up
            </IonNavLink>
          </p>
        </div>
        <IonNavLink routerDirection="forward" component={() => <SocialLogin />}>
          <IonButton>Social Login</IonButton>
        </IonNavLink>
      </div>
>>>>>>> fbd4587721f419d7485e95a680698685ba19f707
      </IonContent>
    </IonPage>

  );
};

export default Login;
