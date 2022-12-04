import React from 'react'

const Trainerpageside = (props) => {
    if (props.selection === '1') {
        fetch('https://api.highstreetgym.xyz/classes/trainersessions/:id',)



        return (
            //my sessions
            <div className='col-span-2 bg-red-200'>
                <div className='text-center'>My Sessions</div>

            </div>
        )

    }
    else if (props.selection === '2') {
        return (
            //create sessions
            <div className='col-span-2 bg-red-200'> Page 2 </div>
        )

    }
    else if (props.selection === '3') {
        return (
            //stats
            <div className='col-span-2 bg-red-200'> page 3 </div>
        )

    } else {
        return (
            <div className='col-span-2 bg-red-200'>Invalid Selection</div>
        )
    }
}




export default Trainerpageside