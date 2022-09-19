import React, { useEffect, useState } from "react";

export default function UserInfo(props: { description: string | undefined }) {
  return (
    <div style={{ color: "black" }}>
      <p>{props.description}</p>
    </div>
  );
}
