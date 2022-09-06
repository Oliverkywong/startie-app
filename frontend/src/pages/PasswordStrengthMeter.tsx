import React from 'react';
import { useForm } from 'react-hook-form';
import PasswordComplexity from './PasswordComplexity';

const PasswordStrengthMeter = () => {

    const DefaultVauleForForm = {
        registration: {
            password: '',
            confirmPassword: ''
        }
    }
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: DefaultVauleForForm.registration
    });

    // const watchPassword = watch();

    // console.log(watchPassword);

    return (
        <form onSubmit={handleSubmit(data => console.log(data))}>
            <label>Password</label>
            <input
                type="password" {...register('password',
                    {
                        required: "must have password",
                        minLength: {
                            value: 8,
                            message: "Please enter your password with 8 characters"
                        }
                    })} />
            {errors.password && <p>{errors.password.message}</p>}
            <PasswordComplexity password={getValues().password?.toString()}/>
            <input
                type="password" {...register('confirmPassword',
                    { validate: (value) => value===getValues().password || 'not match'})} />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            <input type="submit" />
        </form>
    )
}

export default PasswordStrengthMeter