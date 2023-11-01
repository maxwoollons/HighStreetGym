import React from 'react'

const Trainer = (props) => {
    console.log(props.role)
    if (props.role === 'trainer'){
    
    return (
        <div><a href="/trainer">
            TrainerHub
            </a></div>
    )
    }

    else {
        return (
            <div></div>
          )
        }
        
    }
  
 

export default Trainer