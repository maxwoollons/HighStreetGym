import React from 'react'
import { useEffect,useState } from 'react'
import './../style.css'

const Bookings = () => {
    const [bookings,setBookings] = useState([]);
    const [session,setSession] = useState([]);


    cancelBooking = (id) => {
        console.log(id)
        let userid = localStorage.getItem('userid')
        


        if(window.confirm('Are you sure you want to cancel this booking?')){
            fetch('https://api.highstreetgym.xyz/updatepos/booking'+id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(bookingdata => {

            
                fetch('https://api.highstreetgym.xyz/updatepos/minusone/'+bookingdata[0][0].sessionid, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                }
                )
                .catch(err => {
                    console.log(err)
                }
                )
                fetch(`https://api.highstreetgym.xyz/bookings/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    alert('Booking Cancelled')
                    console.log("The id is "+ data.sessionid)

                fetch('https://api.highstreetgym.xyz/bookings/'+localStorage.getItem('userid'),
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
                    if (data.length == 0){
                        let dataarea = document.getElementById('data')
                        dataarea.innerHTML = 'No bookings today :('

                    }
                    else{
                        fetch('https://api.highstreetgym.xyz/bookings/'+localStorage.getItem('userid'),
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                "credentials": "include"
                            }
                        }).then(res => res.json())
                        .then(data => {
                            setBookings(data)
                        }
                        )


                        
                        
                    }
                }
                )
            
        })
    }
    )

        }
        
    }


    useEffect(() => {
        


        fetch('https://api.highstreetgym.xyz/members/check',
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
                    fetch('https://api.highstreetgym.xyz/bookings/'+data.userid,
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
                        if (data.length == 0){
                            let dataarea = document.getElementById('data')
                            dataarea.innerHTML = 'No bookings today :('

                        }
                        else{
                            
                            setBookings(data)
                        }
                    }
                    )
                }
                else {
                    location.href = '/login'
                }

            }
            )
          



    }, [])



  return (
    <div className="container">
        <div className="bookings-page">
        <h1 className="page-title">Bookings</h1>
        <div className="bookings">
            <table className='sesh-table'>
                <thead>
                    <tr>
                        <th>Session</th>
                        <th>Date</th>
                        <th>Trainer</th>
                        <th>Duration</th>
                        <th>Bookings</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody id='data'>
                    {bookings.map(booking => (
                        <tr key={booking.sessionid}>
                            <td>{booking.name}</td>
                            <td>{booking.dateformat}</td>
                            <td>{booking.fname}</td>
                            <td>{booking.length}</td>
                            <td>{booking.currentmembers}/{booking.maxmembers}</td>
                            <td><button onClick={() => cancelBooking(booking.bookingid)}>Cancel</button></td>
                        </tr>
                    ))}
                    </tbody>
            </table>
            </div>
        </div>

    </div>
  )
}

export default Bookings