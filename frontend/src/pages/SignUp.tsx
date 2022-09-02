import React from 'react'
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonPage } from '@ionic/react'
import logo from '../img/StartieLogo.png'
import './Login.css'
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, personOutline } from 'ionicons/icons'


const SignUp: React.FC = () => {

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    };

    const handlePasswordChange = (prop: string) => (e: { target: { value: string } }) => {
        setPassword({ ...password, [prop]: e.target.value });
    };

    return (
        <IonPage>
            <div className='background' >
                <IonImg src={logo} className="logo" />
                <div className='username'>
                    <IonIcon icon={personOutline} />
                    <input type="text" placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
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
                        onChange={handlePasswordChange("password")}
                        placeholder="Password"
                        value={password.password}
                    />
                    <IonIcon icon={password.showPassword ? eyeOutline : eyeOffOutline} onClick={handleClickShowPassword} /><br />
                    <IonButton color="danger">Register</IonButton><br />
                    <input type="checkbox" />
                    <span>By Creating an account you accept the Terms & Condition of the Company</span>
                </div>
                <div className='signup'>
                    <p>Already a member?<a href='#'>Log In</a></p>
                </div>
            </div>
        </IonPage >
    )
}

export default SignUp;