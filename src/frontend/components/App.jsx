import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Footer } from "./Footer";
import {Login} from './Login'
import { Register } from "./Register";
import {Blog} from "./Blog";
import {Sessions} from "./Sessions";
import {CreateSession, TrainerHub} from "./TrainerHub";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

export const App = () => {

    return (
        <Router>
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/blog' element={<Blog/>} />
                <Route path='/sessions' element={<Sessions/>}/>
                <Route path='/trainers' element={<TrainerHub/>} />
                <Route path='/createsession' element={<CreateSession/>} />


              



            </Routes>
        </div>
        <Footer/>

        </Router>
    );
    }
