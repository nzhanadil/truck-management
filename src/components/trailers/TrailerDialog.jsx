import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import NumbersIcon from '@mui/icons-material/Numbers';
import PaletteIcon from '@mui/icons-material/Palette';
import PinIcon from '@mui/icons-material/Pin';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../store/appSlice';
import { addTrailer, closeTrailerDialog, updateTrailer } from '../../store/trailersSlice';

const schema = z.object({
    id: z.string().min(2, "Please enter trailer id"),
    make: z.string().min(2, "Please enter make"),
    model: z.string().min(2, "Please select model"),
    vin: z.string().min(6, "Please enter VIN"),
    status: z.string().min(1, "Please select status"),
    mileage: z.string().min(1, "Please enter mileage"),
    year: z.string().refine((value) => /^(?:[0-9-()/.]\s?){4}$/.test(value), "Please enter year"),
    color: z.string().min(3, "Please enter color"),
    plate_number: z.string().min(3, "Please enter plate number"),
})

const defaultValues = {
    id: '',
    make: '',
    model: '',
    vin: '',
    status: '',
    mileage: '',
    year: '',
    color: '',
    plate_number: '',
  };

const TrailerDialog = () => {
    const dispatch = useDispatch()
    const {isOpen, type, data} = useSelector((store) => store.trailers.trailerDialog)

    const initDialog = () => {
        if (type === 'edit' && data) {
            reset({ ...data });
        }
        if (type === 'new') {
            reset({
            ...defaultValues,
            ...data
            });
        }
    }

    useEffect(() => {
        initDialog()
    }, [isOpen])
        
    const {
        register,
        handleSubmit,
        reset,
        setError, 
        control,
        formState: {errors, isSubmitting}
    } = useForm({resolver: zodResolver(schema), defaultValues})

    const onSubmit = (data) => {
        let message;
        if(type === 'new') {
            const res = dispatch(addTrailer(data))
            if(res.payload === 'failed') {
                setError('id', {message: 'This id is already taken!'})
                setTimeout(() => {setError("id", {message: ""})},1500)
            } else {
                message = 'Trailer '+ data.id + ' created successfully!'
            }
        } else {
            dispatch(updateTrailer(data))
            message = 'Trailer '+ data.id + ' updated successfully!'
        }
        dispatch(closeTrailerDialog())
        dispatch(setAlert({type:'success', message: message}))
    }

  return (
    <>{isOpen && 
        <div className='fixed top-0 right-0 rounded-lg z-10 w-full h-[100vh] flex justify-center items-center bg-gray-900 bg-opacity-40'>
        <form  onSubmit={handleSubmit(onSubmit)} className='border-2 border-teal-900 rounded-lg text-center bg-white drop-shadow-2xl'>
          <div className='text-2xl text-white bg-teal-900 py-3'>
                <p className='mr-2'>{type === 'new' ? 'Create' : 'Edit'} Trailer</p>
          </div>
        
          <div className='xs:flex-col md:flex-row flex p-5 pb-0 gap-5'>
              <div className='flex flex-col gap-5'>
                <Controller
                    name="id"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...register('id')}
                        className="mb-2 w-64"
                        type="text"
                        label="Trailer ID"
                        error={!!errors.id}
                        helperText={errors?.id?.message}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <NumbersIcon className='m-2'/>
                            </InputAdornment>
                            )
                        }}
                        disabled={type==='edit'}
                        variant="outlined"
                        required
                        />
                    )}
                />
                <Controller
                    name="make"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...register('make')}
                        className="mb-2 w-64"
                        type="text"
                        label="Make"
                        error={!!errors.make}
                        helperText={errors?.make?.message}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <LocalShippingIcon className='m-2'/>
                            </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        required
                        />
                    )}
                />
                <FormControl>
                    <InputLabel id="model_label">Model</InputLabel>
                    <Controller
                        name="model"
                        control={control}
                        render={({ field }) => (
                            <Select
                                labelId="model_label"
                                label="Model"
                                {...field}
                            >
                                <MenuItem value="flatbed">Flatbed</MenuItem>
                                <MenuItem value="lowboy">Lowboy</MenuItem>
                                <MenuItem value="step deck">Step Deck</MenuItem>
                                <MenuItem value="double drop">Double Drop</MenuItem>
                                <MenuItem value="conestoga">Conestoga</MenuItem>
                                <MenuItem value="side kit">Side Kit</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
                <Controller
                    name="vin"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...register('vin')}
                        className="mb-2 w-64"
                        type="text"
                        label="VIN"
                        error={!!errors.vin}
                        helperText={errors?.vin?.message}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <ConfirmationNumberIcon className='m-2'/>
                            </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        required
                        />
                    )}
                />
                <FormControl>
                    <InputLabel id="status_label">Status</InputLabel>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                labelId="status_label"
                                label="Status"
                                {...field}
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="damaged">Damaged</MenuItem>
                                <MenuItem value="out of service">Out of Service</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
              </div>

              <div className='flex flex-col gap-5'>
                <Controller
                    name="mileage"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...register('mileage')}
                        className="mb-2 w-64"
                        type="number"
                        label="Mileage"
                        error={!!errors.mileage}
                        helperText={errors?.mileage?.message}
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
                <Controller
                    name="year"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...register('year')}
                        className="mb-2 w-64"
                        type="number"
                        label="Year"
                        error={!!errors.year}
                        helperText={errors?.year?.message}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <CalendarMonthIcon className='m-2'/>
                            </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        required
                        />
                    )}
                />
                <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...register('color')}
                        className="mb-2 w-64"
                        type="text"
                        label="Color"
                        error={!!errors.color}
                        helperText={errors?.color?.message}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <PaletteIcon className='m-2'/>
                            </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        required
                        />
                    )}
                />
                <Controller
                    name="plate_number"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...register('plate_number')}
                        className="mb-2 w-64"
                        type="text"
                        label="Plate number"
                        error={!!errors.plate_number}
                        helperText={errors?.plate_number?.message}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <PinIcon className='m-2'/>
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
          
          <div className='xs:flex-col md:flex-row flex m-5 gap-5'>
              <button 
                  disabled={isSubmitting} 
                  type='submit'
                  className='bg-teal-900 text-white w-full py-2 rounded-lg hover:bg-teal-700'
              >
                {type === 'new' ? 'Create' : 'Update'}
              </button>
              <button
                    onClick={() => dispatch(closeTrailerDialog())}
                    className='border-2 text-teal-900 border-teal-900  w-full py-2 rounded-lg hover:bg-teal-700 hover:border-teal-700 hover:text-white'
              >
                  Cancel
              </button>
          </div>        
        </form>
      </div>}
    </>
    
  )
}

export default TrailerDialog
