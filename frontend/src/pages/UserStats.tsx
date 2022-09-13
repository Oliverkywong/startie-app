import React, { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import './css/UserStats.css'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IonContent, IonInfiniteScroll } from '@ionic/react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function UserStats() {

  const token = useSelector((state: RootState) => state.auth.token);

  const [sectorName, setSectorName] = useState<string[]>([]);
  const [skillName, setSkillName] = useState<string[]>([]);
  const [skillPoint, setSkillPoint] = useState<number[]>([]);

  useEffect(() => {
    async function getAllSectorSkill() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/skill`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const details = await res.json()

      const sectorNameArray: string[] = []
      for (let i = 0; i < details.detail.sector.length; i++) {
        sectorNameArray.push(details.detail.sector[i].name)
      }
      const skillNameArray: string[] = []
      const skillPointArray: number[] = []
      for (let i = 0; i < details.detail.skill.length; i++) {
        skillNameArray.push(details.detail.skill[i].name)
        skillPointArray.push(details.detail.skill[i].point)
      }

      setSectorName(sectorNameArray)
      setSkillName(skillNameArray)
      setSkillPoint(skillPointArray)
    }
    getAllSectorSkill();
  }, [token])


  return (
    <div className="char">
      <IonContent>
        {sectorName.map((sectorName, index) => {
          return (
            <IonInfiniteScroll>
              <Radar key={index} data={{
                labels: [skillName[index * 5], skillName[index * 5 + 1], skillName[index * 5 + 2], skillName[index * 5 + 3], skillName[index * 5 + 4]],
                datasets: [
                  {
                    label: `${sectorName}`,
                    backgroundColor: "rgba(34, 202, 236, 0.2)",
                    borderColor: "rgba(34, 202, 236, 1)",
                    data: [skillPoint[index * 5], skillPoint[index * 5 + 1], skillPoint[index * 5 + 2], skillPoint[index * 5 + 3], skillPoint[index * 5 + 4]]
                  }
                ]
              }} />
            </IonInfiniteScroll>)
        })}
      </IonContent>
    </div>
  )
}