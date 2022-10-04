import React from 'react'
import {useState} from 'react'
import axios from 'axios'


export const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const handleSubmit = (e) => {
        axios.post('/api/users/login', {
            email: email,
            password: password
        })
        .then(res => {
            console.log(res)
            if(res.data.message === 'user not found'){
            alert(res.data.message)
            }else{
            alert('Successfully logged in')
            window.location.href = '/'
            }
        }
        )
        .catch(err => {
            console.log(err)
        }
        )
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }



  return (
    <div className='min-h-screen bg-purple-800'>
    <div>
        <div className='flex flex-wrap justify-center items-center pt-5'>
            <div className='grid grid-rows-3 bg-white  p-3 rounded-lg '>
                <input className='m-1 p-1' placeholder='email' type="text" value={email} onChange={handleEmailChange} />
                <input className='m-1 p-1' placeholder='password' type="password" value={password} onChange={handlePasswordChange} />
                <button className='bg-green-600 p-3' onClick={handleSubmit}>Login</button>

                </div>
                </div>

    </div>
</div>
  )
}
