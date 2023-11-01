import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from './AppContext'
import { Link } from 'react-router-dom'

export const Blog = () => {

    const [posts, setPosts] = useState([{ content: 'Loading...' }])

    const { user, setUser } = useContext(AppContext)


    useEffect(() => {
        axios.get('https://api.highstreetgym.xyz/posts/all')
            .then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    function addLike(e) {
        let post_id = e.target.id
        //edit likes json object of posts variable to add one
        let newPosts = posts.map(post => {
            if (post.post_id == post_id) {
                post.likes = parseInt(post.likes) + 1
            }
            return post
        })
        setPosts(newPosts)





        axios.post('https://api.highstreetgym.xyz/posts/like', { post_id })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }




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
                            <div className='text-white select-none'>
                                {user.id ? <i id={post.post_id} onClick={addLike} class="ri-thumb-up-line p-2 cursor-pointer"></i> : <i class="ri-thumb-up-line p-2"></i>}
                                
                            {post.likes}</div>


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