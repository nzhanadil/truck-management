import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'

const AssignPopup = ({message, handleConfirm, options}) => {
    const [value, setValue] = useState(null)

    const handleSubmit = () => {
        if(value) {
            handleConfirm({response: true, value})
        }
    }

  return (
    <div className='fixed top-0 right-0 rounded-lg z-10 w-full h-[100vh] flex justify-center items-center bg-gray-900 bg-opacity-40'>
        <form className='bg-white rounded-md w-80' onSubmit={handleSubmit}>
            <div className='bg-teal-900 text-center py-3 text-lg text-white'>
                {message}
            </div>

            <div className='w-full'>
                <Autocomplete
                    disablePortal
                    className='m-auto my-5'
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    options={options}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} required label="Assign"/>}
                />
            </div>

            <div className='text-center m-5 flex gap-2 justify-center'>
                <button
                    type='submit'
                    className='bg-teal-900 text-white w-full py-2 rounded-lg hover:bg-teal-700'
                >
                    Yes, Confirm
                </button>
                <button 
                    onClick={() => handleConfirm({response: false, value: ''})}
                    className='border-2 text-teal-900 border-teal-900  w-full py-2 rounded-lg hover:bg-teal-700 hover:border-teal-700 hover:text-white'
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
  )
}

export default AssignPopup
