import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Stats } from './Stats'
import 'remixicon/fonts/remixicon.css'
import FileDownload from 'js-file-download'


export const TrainerHub = () => {

    const [sessionID, setSessionID] = useState(null)



    const [user, setUser] = useState(null)

    const [editData, setEditData] = useState({})

    const [sessions, setSessions] = useState([])

    const [totalUsers, setTotalUsers] = useState([{ "users": 0 }])

    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)

    const [rerender, setRerender] = useState(false)


    function openModal(e) {
        let id = e.target.value
        setSessionID(id)
        axios.post('https://api.highstreetgym.xyz/sessions/session', { id })
            .then(res => {
                setEditData(res.data)
                setShowModal(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function openModal2(e) {
        setShowModal2(true)
    }


    //download history
    function downloadHistory(e) {
    axios.get('https://api.highstreetgym.xyz/data/history', { responseType: 'blob' })
        .then(res => {
            console.log(res.data)
            FileDownload(res.data, 'history.xml');
        }
        )
        .catch(err => {
            console.log(err)
        }
        )
    }

    function downloadToday(e) {
        axios.get('https://api.highstreetgym.xyz/data/today', { responseType: 'blob' })
            .then(res => {
                console.log(res.data)
                FileDownload(res.data, 'today.xml');
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
        }


    function closeModal2() {
        setShowModal2(false)
    }

    function delSession(e){
        const sessionID = e.target.value
        if(window.confirm("Are you sure you want to delete this session? \n(This cannot be undone!)")){
        axios.post('https://api.highstreetgym.xyz/sessions/delete', { id: sessionID })
        .then(res => {


            console.log(res)
            setRerender(!rerender)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    }
        



    useEffect(() => {
        status()


    }, [])

    useEffect(() => {
        axios.get('https://api.highstreetgym.xyz/stats/usernum')
            .then(res => {
                setTotalUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    useEffect(() => {

        if (user) {
            axios.post('https://api.highstreetgym.xyz/sessions/mysessions', { id: user.id })
                .then(res => {
                    setSessions(res.data)
                }
                )
                .catch(err => {
                    console.log(err)
                }
                )
        }







    }, [user,rerender])





    const status = async () => {




        const res = await axios.get('https://api.highstreetgym.xyz/users/loginstatus')
        if (res.data) {
            setUser(res.data)
        } else {
            setUser(null)
        }

    }

    if (user) {
        if (user.role === 'admin' || user.role === 'trainer') {
            return (
                <>
                    <div className='min-h-screen bg-purple-800'>
                        <h1 className='text-center text-white p-2 text-3xl'>Trainer Hub</h1>
                        <Stats openModal2={openModal2} sessions={sessions} usernum={totalUsers} />
                        <h1 className='text-white text-2xl p-2 text-center'>Sessions Coming up this week</h1>
                       

                        {sessions.map(session => {
                            return <div key={session.session_id} className='bg-purple-300 p-2 m-3 rounded-lg flex flex-wrap justify-between'>
                                <h1 className='text-center text-xl p-2'>{session.session_id}</h1>
                                <h1 className='text-center text-xl p-2'>{session.fdate}</h1>
                                <h1 className='text-center text-xl p-2'>{session.time}</h1>
                                <h1 className='text-center text-xl p-2'>{session.session_name}</h1>
                                <h1 className='text-center text-xl p-2'>{session.booked}/{session.max_space} Spaces</h1>
                                <button value={session.session_id} onClick={delSession} className='pointer text-center text-xl text-red-500'>Delete</button>
                                <button value={session.session_id} onClick={openModal} className='pointer text-center text-xl text-red-500'>Edit Details</button>
                            </div>
                        })}



                        <div className='bg-gray-200 p-2 m-2'>
                            <h1 className='text-center'>Data Export</h1>
                            <div className='grid grid-cols-2'>
                            <button onClick={downloadHistory}>Session History</button>
                            <button onClick={downloadToday}>Sessions Today</button>
                            </div>
                        </div>
                    
                    </div>
                

                    {showModal ? <EditModal rerender={rerender} setRerender={setRerender} sessionID={sessionID} user={user} setShowModal={setShowModal} editData={editData} /> : null}
                    {showModal2 ? <BlogCreate user={user} closeModal2={closeModal2}/> : null } 

                </>
            )
        }
    } else {
        return (
            <>
                <h1 className='bg-purple-800 text-white text-center min-h-screen p-5 text-3xl'>403 Please log in to access this content</h1>
            </>
        )
    }
}

export const CreateSession = () => {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [maxSpace, setMaxSpace] = useState('')

    const setNamef = (e) => {
        setName(e.target.value)
    }

    const setDatef = (e) => {
        setDate(e.target.value)
    }

    const setTimef = (e) => {
        setTime(e.target.value)
    }

    const setMaxSpacef = (e) => {
        setMaxSpace(e.target.value)
    }


    const submit = async (e) => {
        e.preventDefault()
        if (name === '' || date === '' || time === '' || maxSpace === '') {
            alert('Please fill in all fields')
            return
        }
        try {
            let capacity = parseInt(maxSpace)
            let user_id = user.id
            console.log(user_id)
            const res = await axios.post('https://api.highstreetgym.xyz/sessions/create', { user_id, date, time, name, capacity })
            if (res.data) {
                alert('Session Created')
            }
        }
        catch (err) {
            console.log(err)
        }







    }







    useEffect(() => {
        axios.get('https://api.highstreetgym.xyz/users/loginstatus')
            .then(res => {
                if (res.data) {
                    setUser(res.data)
                    console.log("data: " + res.data.resonse)
                } else {
                    window.location.href = '/login'
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])



    if (user) {
        if (user.role === 'admin' || user.role === 'trainer') {
            return (
                <div className=' min-h-screen bg-purple-800'>
                    <h1 className='text-center text-white text-3xl p-2 '>Create a Session</h1>
                    <div>

                        <form className='flex flex-col justify-center items-center'>
                            <label className='text-white text-2xl'>Session Name</label>
                            <input type='text' onChange={setNamef} className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                            <label className='text-white text-2xl'>Date</label>
                            <input type='date' onChange={setDatef} className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                            <label className='text-white text-2xl'>Time</label>
                            <input type='time' onChange={setTimef} className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                            <label className='text-white text-2xl'>Max Space</label>
                            <input type='number' onChange={setMaxSpacef} className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                            <label className='text-white text-2xl'>Trainer ID</label>
                            <input disabled value={user.id} type='text' className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                            <button onClick={submit}>Submit</button>
                        </form>


                    </div>
                    <div className='flex justify-center p-5 rounded-md'>
                        <img className='' src="https://cdn.pixabay.com/photo/2017/11/13/15/09/biceps-2945912_960_720.jpg" alt="Inspirational Photo" />
                    </div>
                </div>
            )
        }

    } else {
        return (
            <div className=' min-h-screen bg-purple-800'>
                <h1 className='text-white text-center p-5 text-2xl'>Login To Access This Content</h1>
            </div>
        )

    }


}




export const EditModal = (props) => {
    //close modal
    const closeModal = () => {
        props.setShowModal(false)
    }

    const [name, setName] = useState(props.editData[0].session_name)
    const [date, setDate] = useState(props.editData[0].fdate)
    const [time, setTime] = useState(props.editData[0].time)
    const [maxSpace, setMaxSpace] = useState(props.editData[0].max_space)


    const setNamef = (e) => {
        setName(e.target.value)
    }

    const setDatef = (e) => {
        setDate(e.target.value)
    }

    const setTimef = (e) => {
        setTime(e.target.value)
    }

    const setMaxSpacef = (e) => {
        setMaxSpace(e.target.value)
    }

    const submit = async (e) => {
        e.preventDefault()
        if (name === '' || date === '' || time === '' || maxSpace === '') {
            alert('Please fill in all fields')
            return
        }
        let capacity = parseInt(maxSpace)
        let user_id = props.user.id
        let session_id = props.sessionID
        axios.post('https://api.highstreetgym.xyz/sessions/update', { session_id, user_id, date, time, name, capacity })
            .then(res => {
                if (res.data) {
                    alert('Session Updated')
                    closeModal()
                    props.setRerender(!props.rerender)

                }
            }
            )
            .catch(err => {
                console.log(err)
            }
            )






    }




    return (
        //tailwind modal
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Edit Session
                                </h3>
                                <div className="mt-2">
                                    <form className='flex flex-col justify-center items-center'>
                                        <label className='text-white text-2xl'>Session Name</label>
                                        <input type='text' onChange={setNamef} defaultValue={props.editData[0].session_name} className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                                        <label className='text-white text-2xl'>Date</label>
                                        <input type='text' onChange={setDatef} defaultValue={props.editData[0].fdate} className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                                        <label className='text-white text-2xl'>Time</label>
                                        <input type='time' onChange={setTimef} defaultValue={props.editData[0].time} className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                                        <label className='text-white text-2xl'>Max Space</label>
                                        <input type='number' onChange={setMaxSpacef} defaultValue={props.editData[0].max_space} className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                                        <label className='text-white text-2xl'>Trainer ID</label>
                                        <input disabled value={props.user.id} type='text' className='border-2 border-purple-800 rounded-lg p-2 m-2' />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={submit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-800 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Save
                        </button>
                        <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>



    )

}



export const BlogCreate = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const setTitlef = (e) => {
        setTitle(e.target.value)
    }
    const setContentf = (e) => {
        setContent(e.target.value)
    }


    function submitBlog() {
        let user_id = props.user.id
        props.closeModal2()
        if (title === '' || content === '') {
            alert('Please fill in all fields')
            return
        } else {

       
        axios.post('https://api.highstreetgym.xyz/posts/create', { user_id, title, content })
            .then(res => {
                if (res.data) {
                    alert('Blog Created')
                    props.closeModal2()
                }
            }
            )
            .catch(err => {
                console.log(err)
            }
            )


    }
}




  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className='flex flex-col'>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 text-center m-3" id="modal-headline">
                            Create Blog Post
                        </h3>
                        <div className="mt-2">
                            <form className='flex flex-col justify-center items-center min-w-[100%] p-2'>
                                <input onInput={setTitlef} type="text" placeholder='Title' className='min-w-[100%] pt-1 border-2 rounded-xl border-purple-800 p-1' />
                                <textarea onInput={setContentf} className='border-2 min-w-[100%] mt-3 pt-2 rounded-xl border-purple-800 p-1' placeholder='Text Here'></textarea>
                                
                            </form>
                        </div>
                        </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={submitBlog} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-800 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm">
                <i class="ri-send-plane-2-fill"></i>
                </button>
                <button onClick={props.closeModal2}  type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                <i class="ri-close-line"></i>
                </button>
            </div>
        </div>
    </div>
</div>

  )
}
