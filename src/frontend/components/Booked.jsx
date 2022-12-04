import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Booked = () => {

    const [booked, setBooked] = useState([])
    const [user, setUser] = useState([])
    const [render, setRender] = useState(false)


    function deleteBooking(e){
        let booking_id = e.target.value

        axios.delete('https://api.highstreetgym.xyz/bookings/book',{data:{booking_id}})
        .then(res => {
            console.log(res.data)
            setRender(!render)
        })
    }



    // please fix this max

    // useEffect(() => {
    //     status()

    // }, [])

    // const status = async () => {
    //     const res = await axios.get('/api/users/loginstatus')
    //     if (res.data){
    //         setUser(res.data)
    //     } else {
    //         setUser(null)
    //     }

    // }


    useEffect(() => {

        // get the users id
        axios.get('https://api.highstreetgym.xyz/users/loginstatus')
        .then(res => {
            console
            axios.post('https://api.highstreetgym.xyz/sessions/booked', {id: res.data.id})
            .then(res => {
                setBooked(res.data)
            }
            )
        })
        .catch(err => {
            console.log(err)
        })





       


    }, [render])




  return (
    <div className='min-h-screen bg-purple-800'>
        <h1 className='text-white text-center text-3xl'>My Bookings (This Week)</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {booked.length ? booked.map((session) => {  
            return(
                <div key={session.booking_id} className='text-white bg-[#be185d] p-3 m-3 rounded-lg hover:bg-[#9f1239] duration-500 hover:shadow-lg'>
                    <h1 className='text-xl max-w-[100%] text-center'>{session.session_name}</h1>
                    <h1 className='text-xl max-w-[100%] text-center'>{session.fdate}</h1>
                    <h1 className='text-xl max-w-[100%] text-center'>{session.time}</h1>
                    <div className='text-center'><button onClick={deleteBooking} value={session.booking_id} className='bg-red-100 text-red-800 p-2 m-1 pointer rounded-md'>Delete Booking</button></div>
                </div>
            )
        }) : <div className=' text-center col-span-3 p-5'><h1 className='text-white text-3xl'>You have no bookings this week</h1><Link to="/sessions" className='text-blue-300 underline'>View Sessions</Link></div>}

    
        </div>

    </div>    
  )
}
