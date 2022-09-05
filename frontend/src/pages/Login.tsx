import React, { useState } from 'react'
import { IonIcon, IonImg, IonPage } from '@ionic/react'
import logo from '../img/StartieLogo.png'
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline } from 'ionicons/icons'
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
          handleSubmit(data => {
            console.log(data);
          })}>
          <div className='email'>
            <IonIcon icon={mailOutline} />
            <input
              {...register('email')}
              type="email"
              placeholder='Email'
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