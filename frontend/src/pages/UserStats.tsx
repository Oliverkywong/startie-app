import React from 'react'

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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const RadarData = {
    labels: ["Finger Strength", "Power", "Endurance", "Stability", "Flexability"],
    datasets: [
      {
        label: "March",
        backgroundColor: "rgba(34, 202, 236, .2)",
        borderColor: "rgba(34, 202, 236, 1)",
        data: [13, 10, 12, 6, 3]
      }
    ]

  };
  interface LinearTickOptions  {
    scale?: {
        ticks?: {
          min?: number,
          max?: number,
          stepSize?: number,
          showLabelBackdrop?: boolean,
          backdropColor?: string
        },
        angleLines?: {
          color?: string,
          lineWidth?: number
        },
        gridLines?: {
          color?: string,
          circular: boolean
        }
      }
  }

  export const RadarOptions:LinearTickOptions = {
    scale: {
        ticks: {
          min: 0,
          max: 20,
          stepSize: 4,
          showLabelBackdrop: false,
          backdropColor: "rgba(255, 255, 255, 1)"
        },
        angleLines: {
          color: "rgba(255, 255, 255, .3)",
          lineWidth: 10
        },
        gridLines: {
          color: "rgba(255, 255, 255, .3)",
          circular: true
        }
      }
  }


export default function UserStats() {
    
  return (
    <div className="char">UserInfo
    <Radar data={RadarData}  />
        
    </div>
  )
}