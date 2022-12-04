import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Footer } from "./Footer";
import {Login} from './Login'
import { Register } from "./Register";
import {Blog} from "./Blog";
import {Sessions} from "./Sessions";
import {CreateSession, TrainerHub} from "./TrainerHub";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Children, useEffect, useState } from "react";
import axios from "axios";
import { Booked } from "./Booked";
import { AppContext, AppProvider } from "./AppContext";
import { useState,useEffect,useContext } from 'react';
import EditBlog from './EditBlog'

export const App = () => {

    const [user, setUser] = useState([]);
    
    useEffect(() => {
        axios.get("https://api.highstreetgym.xyz/users/loginstatus")
        .then((res) => {
            if (res.data) {
            setUser(res.data);
            console.log(res.data);
            } else {
            setUser(null);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    

    return (
        

        <Router>
        <div>
        <AppContext.Provider value={{user,setUser}}>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/blog' element={<Blog/>} />
                <Route path='/sessions' element={<Sessions/>}/>
                <Route path='/trainers' element={<TrainerHub/>} />
                <Route path='/createsession' element={<CreateSession/>} />
                <Route path='/booked' element={<Booked/>} />
                <Route path="/editblog" element={<EditBlog/>} />
                <Route path="*" element={<Home/>} />


              



            </Routes>
            </AppContext.Provider>
        </div>
        <Footer/>

        </Router>
        
    );
    }
