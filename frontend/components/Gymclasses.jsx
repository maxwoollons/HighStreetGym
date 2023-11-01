import React from 'react'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./../style.css"
import Button from '@mui/material/Button';

function createData(name, length, skill, trainer, time) {
    return { name, length, skill, trainer, time };
  }
  
  
  

  


const Gymclasses = () => {
    let date = new Date()
    let day = date.getDate()

    if (day === 1 || day === 21 || day === 31 ){
        day += 'st'
    }
    else if (day === 2 || day === 22){
        day += 'nd'
    }
    else if (day === 3 || day === 23){
        day += 'rd'
    }
    else {
        day += 'th'
    }

    //fetch data form database and store it in an array
    const [classes, setClasses] = React.useState([])
    React.useEffect(() => {
        fetch('https://api.highstreetgym.xyz/classes/today')
        .then(res => res.json())
        .then(data => setClasses(data))
    }
    ,[])



  return (
    <div>
        <div className='tablecontainer'>
            <h2 className='subtext'>What classes we have on today as of {day}</h2>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Class Name</TableCell>
            <TableCell align="right">Length (Mins)</TableCell>
            <TableCell align="right">Skill Level</TableCell>
            <TableCell align="right">Trainer</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((row) => (
            <TableRow
              key={row.sessionid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.length}</TableCell>
              <TableCell align="right">{row.skill}</TableCell>
              <TableCell align="right">{row.fname} {row.lname}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
               

        </div>
    </div>
  )
}


export default Gymclasses