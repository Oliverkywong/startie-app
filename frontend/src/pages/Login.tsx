import React from 'react'
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonPage } from '@ionic/react'
import logo from '../img/StartieLogo.png'
import './Login.css'
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline } from 'ionicons/icons'


const Login: React.FC = () => {

  const [email, setEmail] = React.useState('')

  const [password, setPassword] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handlePasswordChange = (prop: string) => (e: {target: { value: string }}) => {
    setPassword({ ...password, [prop]: e.target.value });
  };

  return (
    <IonPage>
      <div className='background' >
        <IonImg src={logo} className="logo" />
        <h1>Hey, Welcome Back!</h1>
        <div className='email'>
          <IonIcon icon={mailOutline} />
          <input type="email" placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='password'>
          <IonIcon icon={lockClosedOutline} />
          <input
            type={password.showPassword ? "text" : "password"}
            onChange={handlePasswordChange("password")}
            placeholder="Password"
            value={password.password}
          />
          <IonIcon icon={password.showPassword ? eyeOutline : eyeOffOutline} onClick={handleClickShowPassword} /><br />
          <IonButton color="danger">Continue</IonButton>
          <a href='#'>Forgot Password?</a>
        </div>
        <div className='signup'>
          <p>New to Startie?<a href='#'>Sign Up</a></p>
        </div>
      </div>
    </IonPage >
  )
}

export default Login;