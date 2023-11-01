import React from 'react'
import { useEffect,useContext,useState } from 'react'
import { AppContext } from './AppContext'
import axios from 'axios'

const EditBlog = () => {


    const {user,setUser} = useContext(AppContext)
    const [posts,setPosts] = useState([])
    const [rerender,setRerender] = useState(false)

    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [postId, setPostId] = useState('')
    const [showModal,setShowModal] = useState(false)


    let id = user.id

    useEffect(() => {
        axios.post('https://api.highstreetgym.xyz/posts/myposts',{id})
            .then(res => {
                setPosts(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )


    }, [user,rerender])

    function editPost(e){
        let id = e.target.value
        axios.post('https://api.highstreetgym.xyz/posts/post',{"post_id":id})
            .then(res => {
                console.log(res.data)
                setPostId(res.data[0].post_id)
                setTitle(res.data[0].title)
                setBody(res.data[0].content)
                setShowModal(true)
            })
            .catch(err => {
                console.log(err)
            })

    }

    function closeModal(){
        setShowModal(false)
    }


    function delPost(e){

        let post_id = e.target.value
        if(window.confirm('Are you sure you want to delete this post?')){
        axios.delete('https://api.highstreetgym.xyz/posts/delete',{data:{post_id}})
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
                <button value={post.post_id} className='border p-1 m-1' onClick={editPost}>Edit</button>

                </div>
        )) : <div>No Posts</div>}



        

        {showModal ? <Modal rerender={rerender} setRerender={setRerender} closeModal={closeModal} title={title} body={body} postId={postId} /> : null}


    </div>
  )
}






function Modal(props){
    const [title,setTitle] = useState(props.title)
    const [body,setBody] = useState(props.body)
    const [postId,setPostId] = useState(props.postId)

    function setTitleFunc(e){
        setTitle(e.target.value)
    }

    function setBodyFunc(e){
        setBody(e.target.value)
    }

    function updatePost(){

        axios.put('https://api.highstreetgym.xyz/posts/update',{title,"content":body,postId})
        .then(res => {

            console.log(res.data)
            props.closeModal()
            props.setRerender(!props.rerender)
        })
        .catch(err => {
            console.log(err)
        })
    }




    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white w-1/2 h-1/2 text-black grid grid-cols-1 p-2'>
                <input value={props.postId} className="border-2 border-black" type="text" name="" id="" readOnly />
                <input onChange={setTitleFunc} defaultValue={props.title} className='border-2 border-black' type="text" name="" id="" />
                <textarea onChange={setBodyFunc} defaultValue={props.body} className='border-2 border-black' name="" id="" cols="30" rows="10"></textarea>
                <button onClick={props.closeModal}>Close</button>
                <button onClick={updatePost}>Update</button>
            </div>
        </div>

    )
}















export default EditBlog