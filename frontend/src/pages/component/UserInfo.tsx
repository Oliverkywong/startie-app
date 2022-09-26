import { IonIcon } from "@ionic/react";
import { logoWhatsapp } from "ionicons/icons";
import React from "react";

import "../css/UserInfo.css";

export default function UserDetail(props: {
  shortDescription: string | undefined;
  description: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}) {
  return (
    <div className="userDetail">
      <p className="userLabel">Short Description</p>
      <p className="userDescription">{props.shortDescription}</p>
      <p className="userLabel">Description:</p>
      <p className="userDescription">{props.description}</p>
      <p className="userLabel">Email: </p>
      <p className="userEmail">{props.email}</p>
      <p className="userLabel">Phone Number: </p>

      <div className="userPhone">
        <IonIcon icon={logoWhatsapp} />
        <span
          onClick={() => {
            window.location.href = `https://wa.me/852${props.phone}`;
          }}
        >
          {props.phone}
        </span>
      </div>
    </div>
  );
}
