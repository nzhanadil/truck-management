import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../store/appSlice'

const StatusAlert = () => {
    const dispatch = useDispatch()
    const {alert} = useSelector((store) => store.app)

  return (
    <>{alert && <div className={`${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} z-100 py-2 px-4 fixed bottom-2 right-2 rounded-lg`}>
        {alert.message}
        {setTimeout(() => {
            dispatch(setAlert(null))
        }, 1500)}
    </div>}</>
  )
}

export default StatusAlert
