import { IonIcon } from "@ionic/react";
import { logoWhatsapp } from "ionicons/icons";
import React from "react";

export default function UserInfo(props: { description: string | undefined, phone: string | undefined }) {
  return (
    <div className="ProfileBackground">
      <p>Description:</p>
      <p>{props.description}</p>
      <p>Phone Number: </p>
      <IonIcon icon={logoWhatsapp} />
      <span onClick={() => {
        window.location.href = `https://wa.me/852${props.phone}`;}}> { props.phone }</span>
    </div >
  );
}
