import React from 'react'

export default function UserInfo(props:{description:string | undefined}) {
    
  return (
    <div style={{color: 'black'}} >UserInfo
      <p>{props.description}</p>
    </div>
  )
}