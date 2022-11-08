import React from 'react'
import "./../style.css"
import { useState } from 'react' 
import Container from '@mui/material/Container';
import Hero from './Hero'
import Gyminfo from './Gyminfo'
import Gymclasses from './Gymclasses';

const Home = () => {
    const [name, setName] = useState(0)
    function click () {
        setName(name+1)
    }
  return (
    <div>
        <Container maxWidth="xlg">
           <Hero/>
           <Gyminfo/>
           <Gymclasses/>
            
            </Container>
    </div>
  )
}

export default Home