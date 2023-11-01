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
        const res = await axios.get('https://api.highstreetgym.xyz/users/loginstatus')
        if (res.data){
            setUser(res.data)
        } else {
            setUser(null)
        }

    }

    const logout = async () => {
        try{
            await axios.get('https://api.highstreetgym.xyz/users/logout')
            setUser(null)
            location.href = '/'

        }
        catch(err){
            console.log(err)
        }

    }

       

    
    
    if (user) {
        if(user.role === 'admin' || user.role === 'trainer'){
            return (
                <>
                    <div className='bg-purple-900 min-w-screen py-5 px-4 flex flex-wrap justify-around items-center text-white text-center'>
                        <Link to="/" className='font-mono text-3xl hidden m-2 p-2 lg:block'>High Street Gym</Link>
                        <Link to="/" className='m-2 p-2'>Home</Link>
                        
                        <Link to='/blog' className='border p-2 rounded m-2'>Blog</Link>
                        <Link to='/sessions' className='m-2 p-2'>Sessions</Link>
                        <Link to='/booked' className='m-2 p-2'>Booked Sessions</Link>

                        <Link to='/trainers' className='m-2 p-2'>TrainerHub</Link>
                        

                        <Link onClick={logout}><i className="ri-logout-circle-r-line m-2 p-2"></i></Link>
                       
                    </div>
                </>
                )
            }else{
            return (
                <>
                    <div className='bg-purple-900 min-w-screen py-5 px-4 flex flex-wrap justify-around items-center text-white'>
                        <Link to="/" className='font-mono text-3xl hidden lg:block m-2 p-2'>High Street Gym</Link>
                        <Link to="/" className='m-2 p-2'>Home</Link>

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
                    <div className='bg-purple-900 min-w-screen py-5 px-4 flex justify-around flex-wrap items-center text-white'>
                        <Link to="/" className='font-mono text-3xl hidden lg:block m-2 p-2'>High Street Gym</Link>
                        <Link to="/" className='m-2 p-2'>Home</Link>
                        
                        <Link to='/blog' className='border p-2 rounded m-2'>Blog</Link>
                        <Link to='/sessions' className='m-2 p-2'>Sessions</Link>
        
                        <Link to='/login' className='m-2 p-2'>Login</Link>
                        <Link to='/register' className='m-2 p-2'>Register</Link>
                    </div>
                </>
        
            )

        }
            
        

    }






