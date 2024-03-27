import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PasswordIcon from '@mui/icons-material/Password';
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import db, { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setUser } from '../../store/usersSlice';
import { Link } from 'react-router-dom';

const schema = z.object({
    firstname: z.string().min(2, "Please enter valid firstname"),
    lastname: z.string().min(2, "Please enter valid lastname"),
    email: z.string().email(),
    phone_number: z.string().refine((value) => /^(?:[0-9-()/.]\s?){10}$/.test(value)),
    password: z.string().min(8, "Please enter longer password"),
    confirm_password: z.string(),
    register_code: z.string().min(2)
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
}).refine((data) => data.register_code === 'driver234' || data.register_code === 'manager234' || data.register_code === 'admin234', {
    message: "Wrong Register Code",
    path: ["register_code"],
})

const Register = () => {
    const dispatch = useDispatch()
    const users = useSelector((store) => store.users)
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
                    dispatch(setUser({...snapshot.data()}))
                })
        } else {
            dispatch(setUser(null))
        }
      });

    const onSubmit = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                dispatch(addUser(data))
            })
            .catch((error) => {
                setError('email', {message: 'Email is already taken!'})
            });
        setTimeout(() => {setError("email", {message: ""})},1500)
    }

  return (
    <>{users.userModal && 
        <div className='w-full h-[100vh] flex items-center justify-center bg-gray-900 bg-opacity-40'>
        <form  onSubmit={handleSubmit(onSubmit)} className='border-2 border-teal-900 rounded-lg text-center bg-white drop-shadow-2xl'>
            <div className='text-2xl flex text-white bg-teal-900 p-3 justify-center'>
                <p className='font-bold mr-2'>TRUCK</p>
                <p>EAST</p>
            </div>
      
            <h1 className='text-2xl m-4'>Register</h1>

            <div className='xs:flex-col md:flex-row flex gap-5 m-5'>
                <div className='flex flex-col gap-5'>
                    <Controller
                        name="firstname"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...register('firstname')}
                            className="mb-2 w-64"
                            type="text"
                            label="Firstname"
                            error={!!errors.firstname}
                            helperText={errors?.firstname?.message}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <PersonIcon className='m-2'/>
                                </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                            />
                        )}
                    />
        
                    <Controller
                        name="lastname"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...register('lastname')}
                            className="mb-2 w-64"
                            type="text"
                            label="Lastname"
                            error={!!errors.lastname}
                            helperText={errors?.lastname?.message}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <PersonIcon className='m-2'/>
                                </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                            />
                        )}
                    />
        
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
                        name="phone_number"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...register('phone_number')}
                            className="mb-2 w-64"
                            type="text"
                            label="Phone number"
                            error={!!errors.phone_number}
                            helperText={errors?.phone_number?.message}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <LocalPhoneIcon className='m-2'/>
                                </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                            />
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...register('password')}
                            className="w-64"
                            type="password"
                            label="Password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <PasswordIcon className='m-2'/>
                                </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                            />
                        )}
                    />
                    <Controller
                        name="confirm_password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...register('confirm_password')}
                            className="m-4 w-64"
                            type="password"
                            label="Confirm Password"
                            error={!!errors.confirm_password}
                            helperText={errors?.confirm_password?.message}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <PasswordIcon className='m-2'/>
                                </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                            />
                        )}
                    />
                    <Controller
                        name="register_code"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...register('register_code')}
                            className="mb-2 w-64"
                            type="text"
                            label="Register Code"
                            error={!!errors.register_code}
                            helperText={errors?.register_code?.message}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <VpnKeyIcon className='m-2'/>
                                </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                            />
                        )}
                    />
                </div>
            </div>
  
            {errors.root && <div className='text-red-500 mt-2'>{errors.root?.message}</div>}
          
            <button 
                disabled={isSubmitting} 
                variant='outlined'  
                type='submit'
                className='m-5 mt-0 bg-teal-900 text-white px-10 py-2 w-64 rounded-lg hover:bg-teal-700'
            >
                Register
            </button>

            <div className='m-3 -mt-2 underline underline-offset-1'>
                <Link to="/signin">
                    Back to Sign in
                </Link>
            </div>   
        </form>
      </div>}
    </>
    
  )
}

export default Register
