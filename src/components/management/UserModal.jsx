import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import db, { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../store/appSlice';
import { closeUserModal } from '../../store/usersSlice';

const schema = z.object({
    firstname: z.string().min(2, "Please enter valid firstname"),
    lastname: z.string().min(2, "Please enter valid lastname"),
    email: z.string().email(),
    phone_number: z.string().refine((value) => /^(?:[0-9-()/.]\s?){10}$/.test(value)),
    role: z.string().min(1, "Please select role"),
})

const UserModal = () => {
    const dispatch = useDispatch()
    const users = useSelector((store) => store.users)
    console.log(users.userModal)
    const {
        register,
        handleSubmit,
        setError, 
        control,
        formState: {errors, isSubmitting}
    } = useForm({resolver: zodResolver(schema)})

    const onSubmit = ({email, firstname, lastname, phone_number, role}) => {
        createUserWithEmailAndPassword(auth, email, "123123123")
            .then((userCredential) => {
                db.collection('users').doc(email).set({firstname, lastname, phone_number, role})
                dispatch(setAlert({type: 'success', message: `User ${email} is created successfully`}))
                dispatch(closeUserModal())
            })
            .catch((error) => {
                setError('root', {message: 'Email is already taken!'})
            });
        setTimeout(() => {setError("root", {message: ""})},1500)
    }

  return (
    <>{users.userModal && 
        <div className='fixed top-0 right-0 rounded-lg z-10 w-full h-[100vh] flex justify-center items-center bg-gray-900 bg-opacity-40'>
        <form  onSubmit={handleSubmit(onSubmit)} className='border-2 border-teal-900 rounded-lg text-center w-80 bg-white drop-shadow-2xl'>
          <div className='text-2xl text-white bg-teal-900 py-3'>
                <p className='mr-2'>Create User</p>
          </div>
      
  
          <h1 className='text-2xl mb-6'></h1>
  
          <div className='flex flex-col gap-5 items-center'>
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
                      type="string"
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
  
              <FormControl className='w-64' control={control} >
                  <InputLabel id="role_label">Role</InputLabel>
                  <Select
                      labelId="role_label"
                      label="Role"
                      {...register('role')}
                      className="mb-2 w-64"
                      required
                  >
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"manager"}>Manager</MenuItem>
                      <MenuItem value={"driver"}>Driver</MenuItem>
                  </Select>
              </FormControl>
          </div>
  
          {errors.root && <div className='text-red-500 mt-2'>{errors.root?.message}</div>}
          
          <div className='flex m-5 gap-2'>
              <button 
                  disabled={isSubmitting} 
                  type='submit'
                  className='bg-teal-900 text-white  py-2 w-64 rounded-lg hover:bg-teal-700'
              >
                  Create User
              </button>
              <button
                    onClick={() => dispatch(closeUserModal())}
                    className='border-2 text-teal-900 border-teal-900 py-2 w-64 rounded-lg hover:bg-teal-900 hover:text-white'
              >
                  Cancel
              </button>
          </div>        
        </form>
      </div>}
    </>
    
  )
}

export default UserModal
