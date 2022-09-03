import React from 'react'
import { IonButton, IonIcon, IonImg, IonPage } from '@ionic/react'
import logo from '../img/StartieLogo.png'
import './css/Login.css'
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline } from 'ionicons/icons'


const Login: React.FC = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState({
    password: "",
    showPassword: false,
  });

  return (
    <IonPage>
      <div className='background' >
        <IonImg src={logo} className="logo" />
        <h1>Hey, Welcome Back!</h1>
        <form onSubmit={(e) => e.preventDefault()}>
        <div className='email'>
          <IonIcon icon={mailOutline} />
          <input type="email" placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='password'>
          <IonIcon icon={lockClosedOutline} />
          <input
            type={password.showPassword ? "text" : "password"}
            onChange={(e) => setPassword({ ...password, password: e.target.value })}
            placeholder="Password"
            value={password.password}
          />
          <IonIcon
            icon={password.showPassword ? eyeOutline : eyeOffOutline}
            onClick={() => setPassword({ ...password, showPassword: !password.showPassword })}
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