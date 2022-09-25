import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButton,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToggle,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { UserInfo } from "../model";
import { logOut } from "../redux/auth/action";
import { loadUserInfo } from "../redux/userInfo/action";
import { useAppDispatch } from "../store";

const UserSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useIonRouter();

  const initialState: UserInfo = {
    id: 0,
    username: "dummy",
    profilepic: "rooticon.jpeg",
    shortDescription: "short",
    description: "testing",
    tags: ["dummytag", "dummytag2"],
    phonenumber: "1234567890",
    email: "123@gmail.com",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/profile" />
          </IonButtons>
          <IonTitle>User Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="setting">
          <IonButton color="danger" onClick={() => {}}>
            Delect Account
          </IonButton>
          <IonButton
            color="danger"
            onClick={() => {
              dispatch(logOut());
              dispatch(loadUserInfo(initialState));
              // window.location.replace("/login");
              router.push("/tab/home");
            }}
          >
            Log Out
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserSettings;
