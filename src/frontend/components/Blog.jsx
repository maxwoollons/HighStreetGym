import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

export const Blog = () => {

    const [posts, setPosts] = useState([{content: 'Loading...'}])


    useEffect (() => {
        axios.get('/api/posts/all')
        .then(res => {
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])





  return (
    <div className='min-h-screen bg-purple-800'>
        <div className='min-h-[400px] bg-[url("https://i.ibb.co/SndSH9d/blog-793047-1920.jpg")] bg-cover bg-center mb-5 flex justify-center items-center'>
            <div className='text-white bg-black p-10 text-xl'>Trainers Blog Posts</div>

        </div>
        <div className='flex justify-evenly items-center flex-wrap'>
            {posts.map(post => {
                return (
                    <div key={post.post_id} className='bg-red-600 p-3 rounded-lg m-3 min-w-[90%] text-center shadow-xl'>
                        <div className='text-white text-lg'>{post.title}</div>
                        <div className='text-white'>{post.content}</div>
                        <div className='text-white'>{post.user_id}</div>


                        </div>
                )
            }
            )}



        </div>

    </div>
  )
}
