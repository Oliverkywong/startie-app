import React from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import "./css/UserStats.css";
import { IonContent } from "@ionic/react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function UserStats(props:{sectorName:string[],skillName:string[],skillPoint:number[]}) {
  return (
    <IonContent>
      <div className="ProfileBackground">
        {props.sectorName.map((sectorName, index) => {
          console.log(sectorName);
          return (
            <div className="char" key={sectorName}>
              <div className="charDetail">
                <Radar className="radar"
                  key={index}
                  data={{
                    labels: [
                      props.skillName[index * 5],
                      props.skillName[index * 5 + 1],
                      props.skillName[index * 5 + 2],
                      props.skillName[index * 5 + 3],
                      props.skillName[index * 5 + 4],
                    ],
                    datasets: [
                      {
                        label: `${sectorName}`,
                        backgroundColor: "rgba(34, 202, 236, 0.2)",
                        borderColor: "rgba(34, 202, 236, 1)",
                        data: [
                         props.skillPoint[index * 5],
                         props.skillPoint[index * 5 + 1],
                         props.skillPoint[index * 5 + 2],
                         props.skillPoint[index * 5 + 3],
                         props.skillPoint[index * 5 + 4],
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </IonContent>
  );
}
