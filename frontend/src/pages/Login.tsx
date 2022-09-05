import React, { useState } from 'react'
import { IonIcon, IonImg, IonPage } from '@ionic/react'
import logo from '../img/StartieLogo.png'
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, personOutline } from 'ionicons/icons'
import { useForm } from "react-hook-form";
import './css/Login.css'

const Login: React.FC = () => {

  const { register, handleSubmit } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);


			// 放userRecord入redux

      
  return (
    <IonPage>
      <div className='background' >
        <IonImg src={logo} className="logo" />
        <h1>Hey, Welcome Back!</h1>
        <form onSubmit={
          handleSubmit(async data => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(data)
            })

            if(res.status === 200) {
              window.location.replace('/homepage') 
            }
          })}>
          <div className='username'>
            <IonIcon icon={personOutline} />
            <input
              {...register('username')}
              type="text"
              placeholder='User Name'
            />
          </div>
          <div className='password'>
            <IonIcon icon={lockClosedOutline} />
            <input
              {...register('password')}
              placeholder='Password'
              type={passwordShown ? "text" : "password"}
            />
            <IonIcon
              icon={passwordShown ? eyeOutline : eyeOffOutline}
              onClick={() => setPasswordShown(passwordShown ? false : true)}
            /><br />
          </div>
          <button type="submit">Continue</button>
        </form>
        <a href='#'>Forgot Password?</a>
        <div className='signup'>
          <p>New to Startie?<a href='#'>Sign Up</a></p>
        </div>
      </div>
    </IonPage >
  )
}

export default Login;