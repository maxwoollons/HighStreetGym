import React from 'react'
import "./../style.css"
import bcrypt from 'bcryptjs';
import validator from 'validator';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Register = () => {








    function onSubmit(){
        let errorbox = document.getElementById('errorbox')
        let fname = document.getElementById('fname').value
        document.getElementById('fname').style.borderColor = '#1976d2'
        document.getElementById('password').style.borderColor = '#1976d2'
        document.getElementById('email').style.borderColor = '#1976d2'
        document.getElementById('mobile').style.borderColor = '#1976d2'

        if (fname === ''){
            errorbox.innerHTML = 'Please enter your firstname'
            errorbox.style.display = 'block'
            document.getElementById('fname').style.borderColor = 'red'
            return
        }
        if (fname.length < 3){
            errorbox.innerHTML = 'fname must be at least 3 characters long'
            document.getElementById('fname').style.borderColor = 'red'
            errorbox.style.display = 'block'

            return
        }
        if (fname.length > 20){
            errorbox.innerHTML = 'fname must be less than 20 characters long'
            document.getElementById('fname').style.borderColor = 'red'
            errorbox.style.display = 'block'
            return
        }
        else {
            errorbox.style.display = 'none'
            document.getElementById('fname').style.borderColor = '#1976d2'
        }
        let lname = document.getElementById('lname').value
        if (lname === ''){
            errorbox.innerHTML = 'Please enter your lastname'
            errorbox.style.display = 'block'
            document.getElementById('lname').style.borderColor = 'red'
            return
        }
        if (lname.length < 3){
            errorbox.innerHTML = 'lname must be at least 3 characters long'
            document.getElementById('lname').style.borderColor = 'red'
            errorbox.style.display = 'block'
        }
        else{
            errorbox.style.display = 'none'
            document.getElementById('lname').style.borderColor = '#1976d2'
        }
        
        let email = document.getElementById('email').value
        if (validator.isEmail(email) === false){
            document.getElementById('email').style.borderColor = 'red'
            errorbox.innerHTML = 'Please enter a valid email'
            errorbox.style.display = 'block'
            return
        }
        else {
            errorbox.style.display = 'none'
            document.getElementById('email').style.borderColor = '#1976d2'

        }

        let mobile = document.getElementById('mobile').value
        if (mobile === ''){
            errorbox.innerHTML = 'Please enter a mobile number'
            errorbox.style.display = 'block'
            document.getElementById('mobile').style.borderColor = 'red'
            return
        }
        if (validator.isMobilePhone(mobile, 'en-AU') === false){
            errorbox.innerHTML = 'Please enter a valid mobile number'
            errorbox.style.display = 'block'
            document.getElementById('mobile').style.borderColor = 'red'
            return
        }
        else {
            errorbox.style.display = 'none'
            document.getElementById('mobile').style.borderColor = '#1976d2'
        }
        let dob = document.getElementById('dob').value
        if (dob === ''){
            errorbox.innerHTML = 'Please enter your date of birth'
            errorbox.style.display = 'block'
            document.getElementById('dob').style.borderColor = 'red'
            return
        }
        else {
            errorbox.style.display = 'none'
            document.getElementById('dob').style.borderColor = '#1976d2'
        }


        let password = document.getElementById('password').value
        if (password === ''){
            errorbox.innerHTML = 'Please enter a password'
            errorbox.style.display = 'block'
            document.getElementById('password').style.borderColor = 'red'
            return
        }
        if (validator.isStrongPassword(password) === false){
            errorbox.innerHTML = 'Password must be at least 8 characters long and contain at least one number, one special character and one uppercase letter'
            errorbox.style.display = 'block'
            document.getElementById('password').style.borderColor = 'red'
            return
        }
        else {
            errorbox.style.display = 'none'
            document.getElementById('password').style.borderColor = '#1976d2'
        }

        let hashpassword = bcrypt.hashSync(password, 10)

        let data = {
            fname: fname,
            lname: lname,
            email: email,
            mobile: mobile,
            dob: dob,
            password: hashpassword
        }
        fetch('/api/members/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                    errorbox.innerHTML = 'Registration successful'
                    errorbox.style.display = 'block'
                    document.getElementById('fname').value = ''
                    document.getElementById('lname').value = ''
                    document.getElementById('email').value = ''
                    document.getElementById('mobile').value = ''
                    document.getElementById('dob').value = ''
                    document.getElementById('password').value = ''
                }
            })

    
    
    
        }



  return (
    <div>

        <div className="container min-h-screen">

            <div className="registerbox">
                <h1>Register</h1>
                <form>
                    <label>First Name</label>
                    <input type="text" placeholder='firstname' id="fname"/>
                    <label>Last Name</label>
                    <input type="text" placeholder='lastname' id="lname"/>
                    <label>Email</label>
                    <input type="email" placeholder='email'id="email"/>
                    <label>Mobile</label>
                    <input type="mobile" placeholder="mobile" id="mobile"/>
                    <label>Date Of Birth</label>
                    <input type="date" placeholder='Date Of Birth'id="dob"/>
                    <label>Password</label>
                    <input type="password" placeholder='password' id="password"/>


                    </form>
                <button onClick={onSubmit}>Register</button>
                <small>Already have an account? <a href="/login">Login Here</a></small>
                <div id='errorbox'>
                    <p>Error</p>
                </div>


            </div>

        </div>
    </div>
  )
}

export default Register