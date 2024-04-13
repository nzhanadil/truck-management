import React, { useState } from 'react'

const Status = ({ title, options, data }) => {
    const [ option, setOption ] = useState(options[0])

  return (
    <div className='w-56 h-60 rounded-lg border-2 shadow-lg m-5 p-5  flex flex-col gap-5 text-center'>
        <select
            className='outline-none text-lg mx-auto text-teal'
            value={option}
            onChange={(e) => setOption(e.target.value)}
        >
            {options.map(option => (
                <option value={option}>{option[0].toUpperCase()+option.slice(1)}</option>
            ))}
        </select>
      <p className='text-2xl text-teal-900'>
        {title}
      </p>

      <p className='font-bold text-6xl text-teal-900'>
        {option === 'all' ? data.length :  data.filter(transport => transport.status === option).length}
      </p>
    </div>
  )
}

export default Status
