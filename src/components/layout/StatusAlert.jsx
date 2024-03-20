import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../store/appSlice'

const StatusAlert = () => {
    const dispatch = useDispatch()
    const {alert} = useSelector((store) => store.app)

    const change = () => {
      setTimeout(() => {
        dispatch(setAlert(null))
      }, 1500)
    }

  return (
    <>{alert && <div className={`${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} z-50 py-2 px-4 fixed bottom-2 right-2 rounded-lg`}>
        {alert.message}
        {change()}
    </div>}
    </>
  )
}

export default StatusAlert
