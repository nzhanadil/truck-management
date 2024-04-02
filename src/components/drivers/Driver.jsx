import { Accordion, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { v4 } from 'uuid';


const Driver = () => {
    const { email } = useParams()
    const { data } = useSelector(store => store.users)
    const [ activeTab, setActiveTab ] = useState('trucksHistory')
    const [ transport, setTransport ] = useState('truck')
    const [ history, setHistory ] = useState([])

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/drivers'
 
    useEffect(() => {
      setHistory(data.find(driver => driver.email === email)[activeTab])
      setTransport(activeTab === 'trucksHistory' ? 'truck' : 'trailer')
    }, [email, activeTab])

    return (
        <div className='w-full bg-gray-200 h-[100vh]'>
            <header className='bg-teal-900 h-[10vh] flex items-center px-12 text-white font-bold text-2xl justify-between'>
                <p>Driver: {email}</p>
                <nav className='flex gap-3'>
                  <button
                    onClick={() => setActiveTab('trucksHistory')}
                    className={`px-4 py-2 rounded-lg hover:bg-teal-700 border-2 border-white ${activeTab === 'trucksHistory' && 'bg-white text-teal-900 hover:text-white'}`}
                  >
                    Trucks
                  </button>
                  <button
                    onClick={() => setActiveTab('trailersHistory')}
                    className={`px-4 py-2 rounded-lg hover:bg-teal-700 border-2 border-white ${activeTab === 'trailersHistory' && 'bg-white text-teal-900 hover:text-white'}`}
                  >
                    Trailers
                  </button>
                  <button
                      onClick={() => {navigate(from, {replace:true})}}
                      className='px-4 py-2 rounded-lg hover:bg-teal-700 border-2 border-white'
                  >
                      Go Back
                  </button>
                </nav>
            </header>

            <div className='m-10 h-[80vh] overflow-scroll rounded-md'>
                {history && history.slice(0).reverse().map(item => (
                    <Accordion
                        key={v4()}
                    >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      email="panel1-header"
                    >
                      <div className='flex justify-between w-full xs:px-2 md:px-10'>
                        <p className='text-lg font-bold'>{`${item.startDate.replaceAll('-', '/')} - ${item.endDate.replaceAll('-', '/')}`}</p>
                        <p 
                          className='text-lg underline italic'
                          onClick={() => navigate(`/${transport}s/${item[transport]}`)}
                        >
                          {`${transport}: ${item[transport]}`}
                        </p>
                      </div>
                    </AccordionSummary>
                  </Accordion>
                ))}
                {!history && <div className='text-center text-2xl font-bold'>No data...</div>}
            </div>
        </div>
    )
}

export default Driver
