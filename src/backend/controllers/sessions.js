import express from 'express';
import { getAllSessionsWeek } from '../models/sessions.js';
import {getSessionsByUserId} from '../models/sessions.js';
import {createSession} from '../models/sessions.js';
import { getSessionBySessionId } from '../models/sessions.js';
import connection from '../db_conn.js';

const sessionController = express.Router();

sessionController.get('/', async (req, res) => {
    const sessions = await getAllSessionsWeek();
    res.json(sessions[0]);
}
);



sessionController.post('/mysessions', async (req, res) => {
    try {
        const id = req.body.id;
        const sessions = await getSessionsByUserId(id);
        res.json(sessions[0]);
        // console.log(sessions);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});


sessionController.post('/create', async (req, res) => {
    try {
        const {name, date, time, capacity, user_id} = req.body
        const session = await createSession(user_id, date, time,name, capacity);
        res.json({message: "session added"}).status(200);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});

sessionController.post('/session', async (req, res) => {
    try {
        const id = req.body.id;
        const session = await getSessionBySessionId(id);
        res.json(session[0]);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});


//update by session id
sessionController.post('/update', async (req, res) => {
    try {
        const {session_id, user_id, date, time, name, capacity} = req.body
        console.log(req.body);
        const session = await connection.query("UPDATE `gymweb`.`sessions` SET `name` = ?, `date` = ?, `time` = ?, `max_space` = ?,`user_id` = ? WHERE (`session_id` = ?)",[name, date, time, capacity, user_id ,session_id]);
        res.json({message: "session updated"}).status(200);
        console.log(session)
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});


//get booked sessions by user id if not in future innerjoin with sessions
sessionController.post('/booked', async (req, res) => {
    try {
        const id = req.body.id;
        //innerjoin with sessions 
        const sessions = await connection.query("SELECT *,date_format(date, '%d/%m/%Y') as fdate FROM gymweb.bookings INNER JOIN gymweb.sessions ON gymweb.bookings.session_id = gymweb.sessions.session_id WHERE gymweb.bookings.user_id = ? AND gymweb.sessions.date >= CURDATE() ORDER BY date",[id]);  

        res.json(sessions[0]);
        // console.log(sessions);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});





export default sessionController;