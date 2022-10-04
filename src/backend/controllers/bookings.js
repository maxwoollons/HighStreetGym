import express from 'express';
import connection from '../db_conn.js';

const bookingController = express.Router();


bookingController.post('/book', async (req, res) => {
    try {
        const {memberid, sessionid} = req.body
        //check to see if booking already exsists
        const booking = await connection.query("SELECT * FROM gymweb.bookings WHERE user_id = ? AND session_id = ?",[memberid,sessionid]);
        if(booking[0].length > 0){
            res.json({message: "booking already exsists"}).status(400);
        }
        else{

        ;
        const booking = await connection.query("INSERT INTO `gymweb`.`bookings` (`user_id`, `session_id`) VALUES ('?', ?)",[memberid, sessionid]);
        res.json({message: "booking added"}).status(200);
        console.log(booking);
        }

    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }

});


export default bookingController;

