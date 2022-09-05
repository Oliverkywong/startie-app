import React from 'react'
import { IonButton, IonIcon, IonImg, IonPage } from '@ionic/react'
import logo from '../img/StartieLogo.png'
import './css/Login.css'
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, personOutline } from 'ionicons/icons'


const SignUp: React.FC = () => {

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState({
        password: "",
        showPassword: false,
    });
    const [checkbox, setCheckbox] = React.useState(false)

    return (
        <IonPage>
            <div className='background' >
                <IonImg src={logo} className="logo" />
                <form onSubmit={(e) => e.preventDefault()}>
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
                            onChange={(e) => setPassword({ ...password, password: e.target.value })}
                            placeholder="Password"
                            value={password.password}
                        />
                        <IonIcon icon={password.showPassword ? eyeOutline : eyeOffOutline} onClick={() => setPassword({ ...password, showPassword: !password.showPassword })} /><br />
                    </div>
                    <input type="checkbox" onChange={(e) => setCheckbox(!checkbox)} />
                    <span>By Creating an account you accept the Terms & Condition of the Company</span><br />
                    {checkbox && <button color="danger">Register</button>}
                </form>
                <div className='signup'>
                    <p>Already a member?<a href='#'>Log In</a></p>
                </div>
            </div>
        </IonPage >
    )
}

export default SignUp;