import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import Sessions from "./Sessions";
import Bookings from "./Bookings";
import { Link, Route } from "wouter";
import Profile from "./Profile";
import Trainerpage from "./Trainerpage";

export const App = () => {
    return (
        <div>
            <Navbar />
            
           <Route path="/"><Home /></Route>
           <Route path="/home"><Home /></Route>
           <Route path="/register"><Register/></Route>
           <Route path="/sessions"><Sessions/></Route>
           <Route path="/login"><Login/></Route>
            <Route path="/bookings"><Bookings/></Route>
            <Route path="/profile"><Profile/></Route>
            <Route path="/trainer"><Trainerpage/></Route>


           <Footer/>

        
        </div>
    );
    }
