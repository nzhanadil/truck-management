import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { useEffect, useState } from 'react'
import { getCurrentDate, uploadImages } from '../../utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { closeUnassignDialog, setAlert } from '../../store/appSlice';
import { updateUser } from '../../store/usersSlice';
import { updateTruck } from '../../store/trucksSlice';

const UnassignDialog = () => {
    const { type, isOpen, id } = useSelector(store => store.app.unassignDialog)
    const users = useSelector(store => store.users)
    const trucks = useSelector(store => store.trucks)
    const trailers = useSelector(store => store.trailers)
    const dispatch = useDispatch()
    const [images, setImages] = useState([])
    let urls = []
    
    const [error, setError ] = useState('')

    useEffect(() => {
        urls = []
        setImages([])
    }, [isOpen])

    const getUserHistory = (email) => {
        const user = users.data.filter(user => user.email === email)[0]
        const history = [...user[type === 'truck' ? 'trucksHistory' : 'trailersHistory']]
        const lastHistory = {...history[history.length-1], endDate: getCurrentDate()}
        history[history.length - 1 ] = lastHistory
        return [...history]
    }

    const getTransportHistory = (id) => {
        const transport = (type === 'truck' ? trucks : trailers).data.filter(transport => transport.id === id)[0]
        const history = [...transport.history]
        const lastHistory = {...history[history.length-1], endDate: getCurrentDate(), images: urls}
        history[history.length - 1] = lastHistory

        return [...history]
    }

    const handleUnassign = () => {
        const transportHistory = getTransportHistory(id)
        const email = transportHistory[transportHistory.length-1].user
        const userHistory = getUserHistory(email)

        const updatedTransport = {id, status: 'active', history: [...transportHistory]}

        const updatedUser = {email}
        updatedUser[type] = ''
        updatedUser[type === 'truck' ? 'trucksHistory' : 'trailersHistory'] = userHistory

        dispatch(updateUser(updatedUser))
        // type === 'truck' ? dispatch(updateTruck(updatedTransport)) : dispatch(updateTrailer(updatedTransport))
        const clone = JSON.parse(JSON.stringify(updatedTransport));
        type === 'truck' && dispatch(updateTruck(clone))

        const message = `${type === 'truck' ? 'Truck' : 'Trailer'} ${id} is successfully unassigned from ${email}!`
        dispatch(setAlert({type: 'success', message: message}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if(images.length >= 10) {
            dispatch(closeUnassignDialog())

            urls = await uploadImages('trucks/vcvcddv', images)

            handleUnassign()
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
        <form className='bg-white w-80' onSubmit={(e) => handleSubmit(e)}>
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
