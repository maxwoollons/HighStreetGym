import React from 'react'
import logo from '../static/images/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { useEffect, useState } from 'react'
import cookieParser from 'cookie-parser'
import 'remixicon/fonts/remixicon.css'

export const Navbar = () => {
    const [user, setUser] = useState(null)





    useEffect(() => {
        status()

    }, [])

    const status = async () => {
        const res = await axios.get('/api/users/loginstatus')
        if (res.data){
            setUser(res.data)
        } else {
            setUser(null)
        }

    }

    const logout = async () => {
        try{
            await axios.get('/api/users/logout')
            setUser(null)

        }
        catch(err){
            console.log(err)
        }

    }

       

    
    
    if (user) {
        if(user.role === 'admin' || user.role === 'trainer'){
            return (
                <>
                    <div className='bg-purple-900 min-w-screen py-5 px-4 flex justify-around items-center text-white'>
                        <Link to="/" className='font-mono text-3xl'>High Street Gym</Link>
                        <Link to='/blog' className='border p-1 rounded'>Blog</Link>
                        <Link to='/sessions' className=''>Sessions</Link>
                        <Link to='/booked' className=''>Booked Sessions</Link>

                        <Link to='/trainers' className=''>TrainerHub</Link>
                        

                        <Link onClick={logout}><i class="ri-logout-circle-r-line"></i></Link>
                       
                    </div>
                </>
                )
            }else{
            return (
                <>
                    <div className='bg-purple-900 min-w-screen py-5 px-4 flex justify-around items-center text-white'>
                        <Link to="/" className='font-mono text-3xl'>High Street Gym</Link>
                        <Link to='/blog' className='border p-1 rounded'>Blog</Link>
                        <Link to='/sessions' className=''>Sessions</Link>
                        <Link to='/booked' className=''>Booked Sessions</Link>


                        <Link onClick={logout}><i class="ri-logout-circle-r-line"></i></Link>
                       
                    </div>
                </>

        )}
        } else {
            return (
                <>
                    <div className='bg-purple-900 min-w-screen py-5 px-4 flex justify-around items-center text-white'>
                        <Link to="/" className='font-mono text-3xl'>High Street Gym logged out</Link>
                        <Link to='/blog' className='border p-1 rounded'>Blog</Link>
                        <Link to='/sessions' className=''>Sessions</Link>
        
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </div>
                </>
        
            )

        }
            
        

    }






