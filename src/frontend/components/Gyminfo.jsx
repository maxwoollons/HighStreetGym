import React from 'react'
import "./../style.css"
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Gyminfo = () => {
  return (
    <div className='infobox'>
        <h1 className='gyminfotitle a-flip-top'>Gyminfo <FitnessCenterIcon/></h1>
        <div className='infoflex'>
        <p className='a-flip-top'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, nisi eu consectetur consectetur,
            nisl nisi consectetur nisl, eu consectetur nisl nisi euismod,
            consectetur nisl nisi eu consectetur nisl nisi euismod,
        </p>
        <p className='a-flip-top'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, nisi eu consectetur consectetur,
            nisl nisi consectetur nisl, eu consectetur nisl nisi euismod,
            consectetur nisl nisi eu consectetur nisl nisi euismod,
        </p>
        <p>
            
           <img className="infoboximage" src='https://i.ibb.co/ZJyF32t/stretching-ga8653cd82-1920-min.jpg'/>

        </p>
        </div>
        
    </div>
  )
}

export default Gyminfo