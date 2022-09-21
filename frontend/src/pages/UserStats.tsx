import React, { useEffect, useState } from "react";

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
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IonContent, IonInfiniteScroll, useIonRouter } from "@ionic/react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function UserStats() {
  const [sectorName, setSectorName] = useState<string[]>([]);
  const [skillName, setSkillName] = useState<string[]>([]);
  const [skillPoint, setSkillPoint] = useState<number[]>([]);
  const router = useIonRouter();

  useEffect(() => {
    async function getAllSectorSkill() {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        router.push("/tab/login");
      }
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/skill`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });
      const details = await res.json();

      const sectorNameArray: string[] = [];
      for (let i = 0; i < details.detail.sector.length; i++) {
        sectorNameArray.push(details.detail.sector[i].name);
      }
      const skillNameArray: string[] = [];
      const skillPointArray: number[] = [];
      for (let i = 0; i < details.detail.skill.length; i++) {
        skillNameArray.push(details.detail.skill[i].name);
        skillPointArray.push(details.detail.skill[i].point);
      }

      console.log(sectorNameArray);
      console.log(skillNameArray);
      console.log(skillPointArray);

      setSectorName(sectorNameArray);
      setSkillName(skillNameArray);
      setSkillPoint(skillPointArray);
    }
    getAllSectorSkill();
  }, []);

  return (
    <IonContent>
      {sectorName.map((sectorName, index) => {
        console.log(sectorName);
        return (
          <div className="char" key={sectorName}>
            {/* <IonInfiniteScroll> */}
            <div className="charDetail">
              <Radar
                key={index}
                data={{
                  labels: [
                    skillName[index * 5],
                    skillName[index * 5 + 1],
                    skillName[index * 5 + 2],
                    skillName[index * 5 + 3],
                    skillName[index * 5 + 4],
                  ],
                  datasets: [
                    {
                      label: `${sectorName}`,
                      backgroundColor: "rgba(34, 202, 236, 0.2)",
                      borderColor: "rgba(34, 202, 236, 1)",
                      data: [
                        skillPoint[index * 5],
                        skillPoint[index * 5 + 1],
                        skillPoint[index * 5 + 2],
                        skillPoint[index * 5 + 3],
                        skillPoint[index * 5 + 4],
                      ],
                    },
                  ],
                }}
              />
            </div>
            {/* </IonInfiniteScroll> */}
          </div>
        );
      })}
    </IonContent>
  );
}
