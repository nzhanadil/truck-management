import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import EmailIcon from '@mui/icons-material/Email';
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { auth } from '../../services/firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';

const schema = z.object({
    email: z.string().email(),
})

const Reset = () => {
    const {
        register,
        handleSubmit,
        setError, 
        control,
        formState: {errors, isSubmitting}
    } = useForm({resolver: zodResolver(schema)})

    const onSubmit = async ({email}) => {
        sendPasswordResetEmail(auth, email)
            .then(
                setError("root", {
                    type: "success",
                    message: "Reset link sent to your email!"
                })
            ).catch(error => {
                setError("root", {
                    message: "Something went wrong, try again!"
                })
            })
        setTimeout(() => {setError("root", {message: ""})},1500)
    }
  return (
    <div className='m-auto mt-[15vh] bg-white drop-shadow-2xl'>
      <form  onSubmit={handleSubmit(onSubmit)} className='border-2 border-teal-900 w-80 rounded-lg text-center'>
        <div className='text-2xl flex text-white bg-teal-900 p-3 justify-center'>
            <p className='font-bold mr-2'>TRUCK</p>
            <p>EAST</p>
        </div>

        <h1 className='text-2xl m-4'>Reset Password</h1>

        <div className='flex flex-col gap-5 items-center'>
            <Controller
            name="email"
            control={control}
            render={({ field }) => (
                <TextField
                {...register('email')}
                className="mb-2 w-64"
                type="text"
                label="Email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <EmailIcon className='m-2'/>
                    </InputAdornment>
                    )
                }}
                variant="outlined"
                required
                />
            )}
            />
        </div>

        {errors.root && <div className={`${errors.root?.type ==='success' ? 'text-green-900' : 'text-red-500'} pt-2`}>{errors.root?.message}</div>}

        <button 
            disabled={isSubmitting} 
            variant='outlined'  
            type='submit'
            className='m-5 bg-teal-900 text-white px-10 py-2 w-64 rounded-lg hover:bg-teal-700'
        >
            Send Reset Link
        </button>

        <div className='m-3 -mt-2 underline underline-offset-1'>
            <Link to="/signin">
                Back to Sign in
            </Link>
        </div>

      </form>
    </div>
  )
}

export default Reset
