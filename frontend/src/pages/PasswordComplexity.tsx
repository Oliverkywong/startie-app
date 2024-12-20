import React, { useState, useLayoutEffect } from "react";
import { IonProgressBar } from "@ionic/react";
import zxcvbn from "zxcvbn";

export default function PasswordComplexity(props: { password: string }) {
  const passwordStrength = zxcvbn(props.password);
  const score = (passwordStrength.score * 100) / 4;
  const [passwordvalid, setPasswordvalid] = useState({
    minLength: null as boolean | null,
    minLowercase: null as boolean | null,
    minUppercase: null as boolean | null,
    minNumbers: null as boolean | null,
    minSymbols: null as boolean | null,
  });

  const isNumber = /\d/;
  const isLowercase = /[a-z]/;
  const isUppercase = /[A-Z]/;
  const isSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  useLayoutEffect(() => {
    setPasswordvalid({
      minLength: props.password.length >= 8,
      minLowercase: !!isLowercase.exec(props.password),
      minUppercase: !!isUppercase.test(props.password),
      minNumbers: !!isNumber.test(props.password),
      minSymbols: !!isSymbol.test(props.password),
    });
  }, [props.password]);

  const Condition = ({ valid, text }: any) => {
    return <li style={{ color: valid ? "green" : "red" }}>{text}</li>;
  };

  const barlable = () => {
    switch (passwordStrength.score) {
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return null;
    }
  };
  const barcolor = () => {
    switch (passwordStrength.score) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "green";
      default:
        return "grey";
    }
  };

  const chagecolor = () => ({
    width: `${score}%`,
    backgroundColor: barcolor(),
    height: "20px",
  });

  return (
        <div>
          <span style={{ color: barcolor() }}>{barlable()}</span>
          <IonProgressBar style={chagecolor()} />
          <span>Password must have:</span>
          <ul>
            <Condition valid={passwordvalid?.minLength} text={"8 characters"} />
            <Condition
              valid={passwordvalid?.minLowercase}
              text={"At least 1 english character"}
            />
            <Condition
              valid={passwordvalid?.minUppercase}
              text={"At least 1 uppercase character"}
            />
            <Condition
              valid={passwordvalid?.minNumbers}
              text={"At least 1 number"}
            />
            <Condition
              valid={passwordvalid?.minSymbols}
              text={"At least 1 symbol"}
            />
          </ul>
        </div>
  );
}
