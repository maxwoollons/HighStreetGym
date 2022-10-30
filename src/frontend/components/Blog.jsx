import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from './AppContext'
import { Link } from 'react-router-dom'

export const Blog = () => {

    const [posts, setPosts] = useState([{ content: 'Loading...' }])

    const { user, setUser } = useContext(AppContext)


    useEffect(() => {
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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {posts.map(post => {
                    return (
                        <div key={post.post_id} className='bg-[#be185d] p-3 m-2 rounded-lg text-center shadow-xl'>
                            <div className='text-white text-lg'>{post.title}</div>
                            <div className='text-white'>{post.content}</div>
                            <div className='text-white'>{post.user_id} - {post.name}</div>


                        </div>
                    )
                }
                )}



            </div>
            <Edit user={user} />


        </div>
    )
}



const Edit = (props) => {
    if (props.user.role === 'admin' || props.user.role === 'trainer') {
        return (
            <>
                <Link to="/editblog">
                    <button className='bg-red-700 p-2 m-2 text-white'>My Blogs</button>
                </Link>

            </>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default Blog