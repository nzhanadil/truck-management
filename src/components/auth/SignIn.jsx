import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import db, { auth } from '../../services/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/usersSlice';
import Loading from '../layout/Loading';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Please enter your password.")
})

const SignIn = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const {
        register,
        handleSubmit,
        setError, 
        control,
        formState: {errors, isSubmitting}
    } = useForm({resolver: zodResolver(schema)})

    onAuthStateChanged(auth, (user) => {
        if (user) {
            db.collection('users')
                .doc(user.email)
                .onSnapshot((snapshot) => {
                    dispatch(setUser({id: user.uid, email: user.email, ...snapshot.data()}))})
        } else {
            dispatch(setUser(null))
        }
        if(isLoading) setIsLoading(false)
      });

    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
            })
            .catch((error) => {
                setError('root', {message: 'Email or password is not correct!'})
            });
        setTimeout(() => {setError("root", {message: ""})},1500)
    }
  return (
    <>
    {isLoading && <Loading />}
    <div className='m-auto mt-[15vh]'>
      <form  onSubmit={handleSubmit(onSubmit)} className='border-2 border-teal-900 w-80 rounded-lg text-center'>
        <div className='text-2xl flex text-white bg-teal-900 p-3 justify-center'>
            <p className='font-bold mr-2'>TRUCK</p>
            <p>EAST</p>
        </div>

        <h1 className='text-2xl m-4'>Sign In</h1>

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

            <Controller
            name="password"
            control={control}
            render={({ field }) => (
                <TextField
                {...register('password')}
                className="w-64 mb-16"
                type="password"
                label="Password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                InputProps={{
                    className: 'pr-2',
                    type: showPassword ? 'text' : 'password',
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
                variant="outlined"
                required
                />
            )}
            />
        </div>

        {errors.root && <div className='text-red-500 mt-2'>{errors.root?.message}</div>}

        <button 
            disabled={isSubmitting} 
            variant='outlined'  
            type='submit'
            className='m-5 bg-teal-900 text-white px-10 py-2 w-64 rounded-lg hover:bg-teal-700'
        >
            Sign In
        </button>

        <div className='m-3 -mt-2 underline underline-offset-1'>
            <Link to="/reset">
                Forgot Password?
            </Link>
        </div>

      </form>

      
    </div>
    </>
    
  )
}

export default SignIn
