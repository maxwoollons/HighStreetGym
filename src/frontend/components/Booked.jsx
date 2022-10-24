import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'

export const Booked = () => {

    const [booked, setBooked] = useState([])


    useEffect(() => {

        //get the users id
        // axios.get('/api/users/loginstatus')



        axios.post('/api/sessions/booked', {id: "3"})
        .then(res => {
            setBooked(res.data)
        }
        )


    }, [])




  return (
    <div className='min-h-screen bg-purple-800'>
        <h1 className='text-white text-center text-3xl'>Upcoming Bookings</h1>
        {booked.map((session) => {  
            return(
                <div key={session.booking_id} className='bg-white p-3 m-3 rounded-lg'>
                    <h1 className='text-xl'>{session.name}</h1>
                    <h1 className='text-xl'>{session.fdate}</h1>
                    <h1 className='text-xl'>{session.time}</h1>
                </div>
            )
        })}

    </div>    
  )
}
