import React from 'react'
import Trainerpageside from './Trainerpageside'
import { useState } from 'react'

const Trainerpage = (props) => {
    const [selection, setSelection] = useState('1')

    function changeSelection(e){
        setSelection(e.target.value)

    }

    let id = props.id


  return (
    <div className='min-h-screen grid grid-cols-3'>
        <div className='col-span-1 bg-gray-200'>
            <div className='flex flex-col items-center'>
                <button onClick={changeSelection} value='1' className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                    My Sessions
                </button>
                <button onClick={changeSelection} value='2' className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                    Create Session
                </button>
                <button onClick={changeSelection} value='3' className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                    My Stats
                </button>
                </div>
                </div>
                <Trainerpageside selection={selection} id={id}/>


    </div>
  )
}

export default Trainerpage