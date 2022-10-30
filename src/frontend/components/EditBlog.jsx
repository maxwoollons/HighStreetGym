import React from 'react'
import { useEffect,useContext,useState } from 'react'
import { AppContext } from './AppContext'
import axios from 'axios'

const EditBlog = () => {


    const {user,setUser} = useContext(AppContext)
    const [posts,setPosts] = useState([])
    const [rerender,setRerender] = useState(false)
    let id = user.id

    useEffect(() => {
        axios.post('/api/posts/myposts',{id})
            .then(res => {
                setPosts(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )


    }, [user,rerender])


    function delPost(e){

        let post_id = e.target.value
        if(window.confirm('Are you sure you want to delete this post?')){
        axios.delete('/api/posts/delete',{data:{post_id}})
        .then(res => {
            console.log(res.data)
            setRerender(!rerender)
        })
    }
    }



  return (
    
        
    <div className='min-h-screen bg-purple-800 text-white p-2'>
        Edit Blog
        {posts ? posts.map((post) => (
            <div key={post.post_id} className="py-2 m-2 p-2 bg-[#be185d]">
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <button value={post.post_id} className='border p-1 m-1' onClick={delPost}>Delete</button>
                </div>
        )) : <div>No Posts</div>}


    </div>
  )
}

export default EditBlog