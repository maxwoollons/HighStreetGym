import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Home = () => {
    const [posts, setPosts] = useState([{content: 'Loading...'}])

    useEffect (() => {
        axios.get('https://api.highstreetgym.xyz/posts/few')
        .then(res => {
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


 




    return (
        <>
            <div className='bg-purple-800 min-h-screen'>
                <Link to="/register" className='bg-teal-500 flex justify-center py-1 text-white hover:bg-orange-400 hover:duration-300 cursor-pointer shadow-lg'>Get Started Now!</Link>
                <div className="bg-green-500 min-h-[500px] bg-[url('https://i.ibb.co/RNC9zYL/banner.jpg')] bg-center bg-cover flex justify-center items-center ">
                <Link to="/blog" className='bg-teal-500 p-3 text-2xl text-white rounded-lg hover:bg-teal-900 hover:duration-300 mt-[200px]'>View our fitness blog</Link>

                </div>
                <div className='text-white text-center p-3 text-lg'>Top Blog Posts</div>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    {posts.map(post => {

                        return (
                            <Link to='/blog'>
                            <div key={post.post_id} className='bg-[#be185d] p-3 rounded-lg m-3 text-center'>
                                <h1 className='text-white text-xl'>{post.title}</h1>
                                <div className='text-white text-lg p-3'>{post.content}</div>
                                <div className='text-white'><i class="ri-thumb-up-line p-2"></i>{post.likes}</div>
                            </div>
                            </Link>
                        )
                    }
                    )}



                </div>



            </div>
            <Offers/>

        </>
    )
}



function Offers (){

    return (
        <div className='bg-purple-800 min-h-screen'>
            {/* <h1 className='text-white p-10 text-center text-xl'>What we can offer</h1> */}

            <div className='min-w-[200px] flex justify-center '>
                
            <img className='shadow-2xl rounded-lg' src="https://cdn.pixabay.com/photo/2016/10/11/01/58/woman-1730325_960_720.jpg" alt="training" />
           
            </div>
            <div className='text-white flex justify-center pt-10'>
            <Link to="/sessions" className='bg-purple-500 p-5 m-5 rounded-md '>Gym Sessions</Link>
            </div>
        </div>
    )
}