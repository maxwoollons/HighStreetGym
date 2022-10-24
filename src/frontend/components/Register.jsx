import axios from 'axios'
import React from 'react'
import { useState } from 'react'

export const Register = () => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')


    const handleSubmit = (e) => {
        axios.post('/api/users/register', {
            name: name,
            email: email,
            password: password

        })
            .then(res => {
                alert(res.message)


            }
            )
            .catch(err => {
                alert(err)

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

    const handleNameChange = (e) => {
        setName(e.target.value)
    }





    return (
        <div className='min-h-screen bg-purple-800'>
            <div>
                <div className='flex justify-center items-center pt-5'>
                    <div className='bg-white  p-3 rounded-lg grid grid-rows-3 '>
                        <input className='m-1 p-1' placeholder='name' type="text" value={name} onChange={handleNameChange} />
                        <input className='m-1 p-1' placeholder='email' type="text" value={email} onChange={handleEmailChange} />
                        <input className='m-1 p-1' placeholder='password' type="text" value={password} onChange={handlePasswordChange} />
                        <button className='bg-green-600 p-3' onClick={handleSubmit}>Register</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
