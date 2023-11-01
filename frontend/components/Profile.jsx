import React from 'react';
import {useEffect,useState} from 'react';
import './../style.css'



const Profile = () => {
    const [profileinfo,setProfileinfo] = useState([]);
    React.useEffect(() => {
        fetch('https://api.highstreetgym.xyz/members/check',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "credentials": "include"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.userid){
                    console.log('logged in')
                    //set local data id to data.userid
                    localStorage.setItem('userid', data.userid)
                }
                else{
                    location.href = '/login'
                }

            }
            )
            fetch('https://api.highstreetgym.xyz/members/'+localStorage.getItem('userid'),
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "credentials": "include"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setProfileinfo(data)
                }
                )
             
    }

    
    
    , [])


  
    return (
        <div className="container">
            <div className="profile-page">
                <div id="info">
                    {/* display all of the info from the profile page from profileinfo */}
                    <div id="profile-info">
                        {profileinfo.map(a => {
                            return (
                                <div className='container'>
                                    <div className='row'>
                                    <div className="profile-image">
                                        <img src="https://cdn.pixabay.com/photo/2020/05/11/11/23/woman-5157666_1280.jpg" alt="Woman" />

                                    </div>
                                    <div className="profilebox">
                                    <h1>Profile Info</h1>

                                    <h3>First Name: {a.fname}</h3>
                                    <h3>Last Name: {a.lname}</h3>
                                    <h3>Age: {a.age}</h3>
                                    </div>
                                    </div>
                                    
                                </div>
                            )
                        })
                        }


                </div>
                </div>
                


                
                </div>
        </div>
    )
 
}

export default Profile