import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Stats = (props) => {

    const [accAge, setAccAge] = useState([{ "accage": 0 }]);

    useEffect(() => {

    axios.get('/api/stats/accage')
        .then(res => {
            setAccAge(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[] )








  return (
    <div className='grid grid-cols-3 text'>
        <div className='bg-purple-300 p-3 m-3 rounded-lg shadow-xl'>
            <div className='text-2xl'>Total Users</div>
            <div className='text-4xl'>{props.usernum.users}</div>
        </div>
        <div className='bg-purple-300 p-3 m-3 rounded-lg shadow-xl'>
            <div className='text-2xl'>My Classes</div>
            <div className='text-4xl'>{props.sessions ? props.sessions.length : 0}</div>
        </div>
        <div className='grid grid-cols-2'>
            <div className='bg-purple-300 p-3 m-3 rounded-lg shadow-xl'>
                <div className='text-2xl'>Days Trainer</div>
                <div className='text-4xl'>{accAge.accage}</div>
                </div>
                <div className='bg-purple-300 p-3 m-3 rounded-lg shadow-xl flex items-center'>
                <Link to="/createsession"><button className='text-2xl'>Create Session</button></Link>
                </div>
                <div className='bg-purple-300 p-3 m-3 rounded-lg shadow-xl flex items-center col-span-2 text-center'>
                <button onClick={props.openModal2} className='text-2xl'>Create Blog Post</button>
                </div>
           
        </div>

    </div>
    )
}
