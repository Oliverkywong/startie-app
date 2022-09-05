import React, { useState } from 'react'
import { IonIcon, IonImg, IonPage } from '@ionic/react'
import logo from '../img/StartieLogo.png'
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, personOutline } from 'ionicons/icons'
import { useForm } from "react-hook-form";
import './css/Login.css'
import PasswordComplexity from './PasswordComplexity';

const SignUp: React.FC = () => {

    const { register, handleSubmit, getValues, watch } = useForm();
    const [passwordShown, setPasswordShown] = useState(false);
    const [checkbox, setCheckbox] = useState(false)

    const password = watch("password");

    return (
        <IonPage>
            <div className='background' >
                <IonImg src={logo} className="logo" />
                <form onSubmit={
                    handleSubmit(data => {
                        console.log(data);
                    })}>
                    <div className='username'>
                        <IonIcon icon={personOutline} />
                        <input
                            {...register('username')}
                            type="text"
                            placeholder="Username"
                        />
                    </div>
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
                            placeholder='Password'
                            type={passwordShown ? "text" : "password"}
                            {...register('password',
                                {
                                    required: "must have password",
                                    minLength: {
                                        value: 8,
                                        message: "Please enter your password with 8 characters"
                                    }
                                })}
                        />
                        <IonIcon
                            icon={passwordShown ? eyeOutline : eyeOffOutline}
                            onClick={() => setPasswordShown(passwordShown ? false : true)}
                        /><br />
                        <PasswordComplexity password={password?.toString() ?? ''} />
                    </div>
                    <input type="checkbox" onChange={() => setCheckbox(!checkbox)} />
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
