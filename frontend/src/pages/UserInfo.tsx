import React from "react";

export default function UserInfo(props: { description: string | undefined, phone: string | undefined }) {
  return (
    <div className="ProfileBackground">
      <p>{props.description}</p>
      <div onClick={() => {
        window.location.href = `https://wa.me/${props.phone}`;}}> { props.phone }</div>
    </div >
  );
}
