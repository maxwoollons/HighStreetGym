import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'

export const Booked = () => {

    const [booked, setBooked] = useState([])
    const [user, setUser] = useState([])
    const [render, setRender] = useState(false)


    function deleteBooking(e){
        let booking_id = e.target.value

        axios.delete('http://localhost:1234/api/bookings/book',{data:{booking_id}})
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
        axios.get('/api/users/loginstatus')
        .then(res => {
            console
            axios.post('/api/sessions/booked', {id: res.data.id})
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
        {booked.map((session) => {  
            return(
                <div key={session.booking_id} className='bg-[#be185d] p-3 m-3 rounded-lg hover:bg-[#9f1239] duration-500 hover:shadow-lg'>
                    <h1 className='text-xl max-w-[100%] text-center'>{session.session_name}</h1>
                    <h1 className='text-xl max-w-[100%] text-center'>{session.fdate}</h1>
                    <h1 className='text-xl max-w-[100%] text-center'>{session.time}</h1>
                    <div className='text-center'><button onClick={deleteBooking} value={session.booking_id} className='bg-red-100 text-red-800 p-2 m-1 pointer rounded-md'>Delete Booking</button></div>
                </div>
            )
        })}
        </div>

    </div>    
  )
}
