import React from 'react'

const ConfirmationPopup = ({message, handleConfirm}) => {
  return (
    <div className='fixed top-0 right-0 rounded-lg z-10 w-full h-[100vh] flex justify-center items-center bg-gray-900 bg-opacity-40'>
        <div className='bg-white rounded-md w-80'>
            <div className='bg-teal-900 text-center py-3 text-lg text-white'>
                {message}
            </div>

            <div className='text-center p-5 flex gap-2 justify-center'>
                <button
                    onClick={() => handleConfirm(true)}
                    className='bg-teal-900 text-white w-full py-2 rounded-lg hover:bg-teal-700'
                >
                    Yes, Confirm
                </button>
                <button 
                    onClick={() => handleConfirm(false)}
                    className='border-2 text-teal-900 border-teal-900  w-full py-2 rounded-lg hover:bg-teal-700 hover:border-teal-700 hover:text-white'
                >
                    No, Close
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationPopup
