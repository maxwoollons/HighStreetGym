import React from 'react'
import './../style.css' 
import { useEffect,useState } from 'react'
import session from 'express-session';






const Sessions = () => {
    const [SessionData,setSessionData] = useState([]);



    bookSession = (id) => {
        if(window.confirm('Are you sure you want to book this session?')){
            let userId = localStorage.getItem('userid')
            let sessionId = id
            //check
            fetch(`/api/bookings/${userId}/${sessionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.booked === 'true'){
                    alert('Already Booked For this session')
                }
                else{
                    fetch('/api/bookings/' + userId + '/'+ id +'/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                    .then(data => {
                        fetch('/api/bookings/'+id,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        )
                        fetch("/api/classes/today").then(res => res.json())
                        .then(data => {
                            console.log(data)
                            setSessionData(data)
                        }
                        )

                        alert('Booked Successfully for this session!')
                    }).catch(err => {
                        console.log(err)
                    }
                    )
                
                }
            })
            
            
        }

        }
    
//fetch api/memebers/check then use react to display sessions page if logged in else redirect to login page
    useEffect(() => {
        fetch('/api/members/check',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "credentials": "include"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.userid){
                    console.log('logged in')
                    //set local data id to data.userid
                    
                    localStorage.setItem('userid', data.userid)
                }
                else{
                    location.href = '/login'
                }

            }
            )
            

            fetch('/api/classes/today',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "credentials": "include"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setSessionData(data)

                }
                )
    }, [])



    return (
        <div>
            <div className="container">
                <div className="sessions-page">
                <h1 class="page-title">Available sessions</h1>
                <div className="sessions">
                    <table className='sesh-table'>
                        <thead>
                            <tr>
                                <th>Session</th>
                                <th>Date</th>
                                <th>Trainer</th>
                                <th>Duration</th>
                                <th>Avaliable</th>
                                <th>Book</th>
                            </tr>
                        </thead>
                        <tbody id='data'>
                            {SessionData.map(session => (
                                <tr>
                                    <td>{session.name}</td>
                                    <td>{session.dateformat}</td>
                                    <td>{session.fname} {session.lname}</td>
                                    <td>{session.length} Minutes</td>
                                    <td>{session.currentmembers}/{session.maxmembers}</td>
                                    <td><a onClick={() => bookSession(session.sessionid)}><button>Book</button></a></td>
                                </tr>
                            ))}


                            
                        </tbody>
                    </table>

                    </div>
                    </div>
            </div>
            </div>
    )
}






export default Sessions