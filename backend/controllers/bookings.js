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
        //add 1 to session booking number
        const session = await connection.query("UPDATE `gymweb`.`sessions` SET `booked` = `booked` + 1 WHERE (`session_id` = ?)",[sessionid]);
        res.json({message: "booking created"}).status(200);
        console.log(booking);
        }

    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }

});


//delete booking
bookingController.delete('/book', async (req, res) => {
    try {
        const {booking_id} = req.body
        console.log(booking_id);

        const session = await connection.query("SELECT session_id FROM gymweb.bookings WHERE booking_id = ?",[booking_id]);

        const session2 = await connection.query("UPDATE `gymweb`.`sessions` SET `booked` = `booked` - 1 WHERE (`session_id` = ?)",[session[0][0].session_id]);


        const booking = await connection.query("DELETE FROM gymweb.bookings WHERE booking_id = ?",[booking_id]);


        
        
        console.log(booking);
        
        res.json({message: "booking deleted"}).status(200);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});



export default bookingController;

