import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAssignDialog, setAlert } from '../../store/appSlice'
import { getCurrentDate } from '../../utils/HelperFunctions'
import { updateUser } from '../../store/usersSlice'
import { updateTruck } from '../../store/trucksSlice'

const AssignDialog = () => {
    const { type, isOpen, id } = useSelector(store => store.app.assignDialog)
    const users = useSelector(store => store.users)
    const trucks = useSelector(store => store.trucks)
    const trailers = useSelector(store => store.trailers)
    const dispatch = useDispatch()
    const [email, setEmail] = useState(null)
    const [error, setError ] = useState('')
    const [ options, setOptions ] = useState([])

    const getAvailableDrivers = (type) => {
        if(users.currentUser) {
            if(users.currentUser.role === 'driver') {
                if(users.currentUser[type]==='') return [users.currentUser.email]
                return []
            } 
            return users.data.filter(user => user.role === 'driver' && user[type] === '').map(user => user.email)
        }
        return []
    }

    useEffect(() => {
        setEmail('')
        setOptions(getAvailableDrivers(type))
    }, [isOpen])

    const getUserHistory = (email) => {
        const user = users.data.filter(user => user.email === email)[0]
        const history = user[type === 'truck' ? 'trucksHistory' : 'trailersHistory']
        const newHistory = {startDate: getCurrentDate(), endDate: ''}
        newHistory[type] = id

        return [...history, newHistory]
    }

    const getTransportHistory = (id) => {
        const { history } = (type === 'truck' ? trucks : trailers).data.filter(transport => transport.id === id)[0]
        const newHistory = {startDate: getCurrentDate(), endDate: '', user: email, images: []}

        return [...history, newHistory]
    }

    const handleAssign = () => {
        const updatedTransport = {id, status: 'assigned', history: getTransportHistory(id)}
        const updatedUser = {email}
        updatedUser[type] = id
        updatedUser[type === 'truck' ? 'trucksHistory' : 'trailersHistory'] = getUserHistory(email)

        dispatch(closeAssignDialog())
        dispatch(updateUser(updatedUser))
        // type === 'truck' ? dispatch(updateTruck(updatedTransport)) : dispatch(updateTrailer(updatedTransport))
        type === 'truck' && dispatch(updateTruck(updatedTransport))

        const message = `${type === 'truck' ? 'Truck' : 'Trailer'} ${id} is successfully assigned to ${email}!`
        dispatch(setAlert({type: 'success', message: message}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            handleAssign()
        } else {
            setError("Please select a driver")
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
                Please select driver to assign
            </div>

            <div className='w-full text-center'>
                <Autocomplete
                    disablePortal
                    className='m-auto my-5'
                    value={email}
                    onChange={(event, newValue) => setEmail(newValue)}
                    options={options}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField {...params} label="Assign"/>}
                />
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
                    onClick={() => dispatch(closeAssignDialog())}
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

export default AssignDialog
