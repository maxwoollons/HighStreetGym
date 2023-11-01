import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'


export const Sessions = () => {


    const [user, setUser] = useState(null)

    const [sessions, setSessions] = useState([{ content: 'Loading...' }])
    useEffect(() => {
        axios.get('https://api.highstreetgym.xyz/sessions/')
            .then(res => {
                setSessions(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )


    }, [])


    useEffect(() => {
        axios.get('https://api.highstreetgym.xyz/users/loginstatus')
            .then(res => {
                if (res.data) {
                    setUser(res.data)
                    console.log(res.data)
                } else {
                    setUser(null)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    function bookUser(e) {
        let id = e.target.value
        console.log(id)
        axios.post('https://api.highstreetgym.xyz/bookings/book',
            {
                memberid: user.id,
                sessionid: id
            })
            .then(res => {
                window.alert(res.data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div className='min-h-screen bg-purple-800'>
            <div>
                <h1 className='text-white text-3xl text-center p-3 underline underline-offset-8'>Sessions We Have this week</h1>
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    
                        {sessions.map(session => {
                            return (
                                <div key={session.session_id} className=' bg-[#be185d] p-3 rounded-lg m-3 min-w-[90%] text-center shadow-xl text-white'>
                                    <div>{session.session_name}</div>
                                    <div>{session.fdate} {session.time}</div>
                                    <div>{session.max_space} Spaces</div>
                                    <div>{session.name}</div>
                                    {user ? <div><button className='bg-[#FFFFFF] text-black p-2 rounded-md m-1' value={session.session_id} onClick={bookUser}>Book Now</button></div> : null}
                                </div>
                            )
                        })}



                    </div>
                </div>
            </div>

        </div>
    )
}
