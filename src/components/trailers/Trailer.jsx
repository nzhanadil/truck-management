import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 } from 'uuid';

const Trailer = () => {
    const { id } = useParams()
    const { data } = useSelector(store => store.trailers)
    const [ history, setHistory ] = useState([])

    const navigate = useNavigate()
 
    useEffect(() => {
        setHistory(data.find(trailer => trailer.id === id).history)
    }, [id])

    return (
        <div className='w-full bg-gray-200 h-[100vh]'>
            <header className='bg-teal-900 h-[10vh] flex items-center px-12 text-white font-bold text-2xl justify-between'>
                <p>Trailer - {id}</p>
                <button
                    onClick={() => {navigate('/trailers', {replace:true})}}
                    className='px-4 py-2 rounded-lg hover:bg-teal-700 border-2 border-white'
                >
                    Go Back
                </button>
            </header>

            <div className='m-10 h-[80vh] overflow-scroll rounded-md'>
                {history && history.slice(0).reverse().map(item => (
                    <Accordion
                        key={v4()}
                    >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <div className='flex justify-between w-full xs:px-2 md:px-10'>
                        <p className='text-lg font-bold'>{`${item.startDate.replaceAll('-', '/')} - ${item.endDate.replaceAll('-', '/')}`}</p>
                        <p className='text-lg'>{item.user}</p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className='flex w-full overflow-scroll gap-2'>
                      {item?.images?.map(image => (
                        <img key={v4()} src={image} className='h-52'/>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
                {!history && <div className='text-center text-2xl font-bold'>No data...</div>}
            </div>
        </div>
    )
}

export default Trailer
