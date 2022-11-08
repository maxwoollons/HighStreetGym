import { Logout } from '@mui/icons-material';
import React from 'react'
import './../style.css'
import Trainer from './Trainer';

function logOut(){
  fetch('/api/members/logout',
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
    location.href = '/'
   
  }
  )
}


const Navbar = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [role, setRole] = React.useState('');
  const [id,setId] = React.useState('');
  React.useEffect(() => {
    fetch('/api/members/check',
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
        setLoggedIn(true);
        setRole(data.role);
        setId(data.userid);
      }

    }
    )
  }, [])

  if (loggedIn){
    return (
      <div>
        <div className="navbar">
          <h1>High Street Gym</h1>
          <div><a href="/">
            Home
            </a></div>
            <div><a href="/profile">
            Profile
            </a></div>
            <div><a href="/sessions">
            Sessions
            </a></div>
            <div><a href="/bookings">
            Bookings
            </a></div>
            <Trainer role={role}/>
            <div onClick={logOut}>
              
            Logout
            </div>
            

            
            
        </div>
      </div>
    )
  }

  else{
    return (
      <div>
        <div className="navbar">
        <h1>High Street Gym</h1>

          <div><a href="/">
            Home
            </a></div>
            <div><a href="/login">
            Login
            </a></div>
            <div><a href="/register">
            Register
            </a></div>
          
            
        </div>
      </div>
    )

  }

  }

export default Navbar