import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'


export const Sessions = () => {


    const [user, setUser] = useState(null)

    const [sessions, setSessions] = useState([{ content: 'Loading...' }])
    useEffect(() => {
        axios.get('/api/sessions/')
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
        axios.get('/api/users/loginstatus')
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
        axios.post('/api/bookings/book',
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
                    <div className='flex justify-center flex-col items-center bg-red-400'>
                    
                        {sessions.map(session => {
                            return (
                                <div key={session.session_id} className='flex justify-evenly bg-red-600 p-3 rounded-lg m-3 min-w-[90%] text-center shadow-xl text-white'>
                                    <div>ID: {session.session_id}</div>
                                    <div>Session Time: {session.fdate} {session.time}</div>
                                    <div>Max Space: {session.max_space}</div>
                                    <div>Trainer: {session.name}</div>
                                    {user ? <div><button value={session.session_id} onClick={bookUser}>Book Now</button></div> : null}
                                </div>
                            )
                        })}



                    </div>
                </div>
            </div>

        </div>
    )
}
