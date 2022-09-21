import React, { useEffect, useState } from "react";

export default function UserInfo(props: { description: string | undefined }) {
  return (
    <div className="ProfileBackground">
      <p>{props.description}</p>
    </div>
  );
}
