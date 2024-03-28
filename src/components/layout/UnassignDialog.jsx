import { Autocomplete, TextField } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { useState } from 'react'
import { convertImagesToBase64 } from '../../utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { closeUnassignDialog } from '../../store/appSlice';

const UnassignDialog = ({ handleConfirm }) => {
    const { type, isOpen } = useSelector(store => store.app.unassignDialog)
    const dispatch = useDispatch()

    const [images, setImages] = useState(null)
    const [error, setError ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(images.length >= 10) {
            handleConfirm({response: true, value: convertImagesToBase64(images)})
        } else {
            setError("Miniumum of 10 images required")
            setTimeout(() => {
                setError('')
            }, 1500)
        }
    }

  return (
    <>{isOpen && 
    <div className='fixed top-0 right-0 rounded-lg z-10 w-full h-[100vh] flex justify-center items-center bg-gray-900 bg-opacity-40'>
        <form className='bg-white rounded-md w-80' onSubmit={(e) => handleSubmit(e)}>
            <div className='bg-teal-900 text-center py-3 text-lg text-white'>
                Please select photos to unassign
            </div>

            <div className='w-full text-center'>
                <input 
                    type="file" 
                    id='image_input' 
                    name='images' 
                    className='hidden' 
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                />
                <label htmlFor="image_input" className='m-auto my-5'>
                    <AddPhotoAlternateIcon className='text-8xl text-gray-600' fontSize=''/>
                </label>
                {error && <div className='text-red-500'>{error}</div>}
            </div>

            <div className='text-center m-5 flex gap-2 justify-center'>
                <button
                    type='submit'
                    className='bg-teal-900 text-white w-full py-2 rounded-lg hover:bg-teal-700'
                >
                    Yes, Confirm
                </button>
                <button 
                    onClick={() => dispatch(closeUnassignDialog())}
                    className='border-2 text-teal-900 border-teal-900  w-full py-2 rounded-lg hover:bg-teal-700 hover:border-teal-700 hover:text-white'
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
    }</>
  )
}

export default UnassignDialog
