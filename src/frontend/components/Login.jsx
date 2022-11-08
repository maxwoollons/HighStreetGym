import React from 'react'
import "./../style.css"

const Login = () => {
    function submitbtn (){
        let errorbox = document.getElementById('errorbox')
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let data = {
            email: email,
            password: password
        }
        fetch('/api/members/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "credentials": "include",
                "sameSite": "true",
                "cors": "none"
                },
                body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error){
                        errorbox.innerHTML = data.error
                        errorbox.style.display = 'block'
                    }
                    else {
                        location.href = '/'
                        errorbox.innerHTML = 'Login successful'
                        errorbox.style.display = 'block'
                        document.getElementById('email').value = ''
                        document.getElementById('password').value = ''
                    }
                })

    
    }
        



  return (
    <div>
        <div className="container">
            <div className="registerbox">
                <h1>Login</h1>
                <form>
                    <label>Email</label>
                    <input id='email' type="text" placeholder='email' />
                    <label>Password</label>
                    <input id="password" type="password" placeholder='password' />
                    </form>
                <button onClick={submitbtn}>Login</button>
                <small>Need an account? <a href="/register">Register Here</a></small>
                <div id='errorbox'>
                    <p>Error</p>
                    </div>



            </div>

        </div>
    </div>
  )
}

export default Login