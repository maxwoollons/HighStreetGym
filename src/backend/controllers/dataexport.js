import express from 'express';
import connection from '../db_conn.js';
import ejs from 'ejs';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import dotenv from 'dotenv';

const dataController = express.Router();

dotenv.config()



 const key = process.env.SECRET_KEY;




function authenticateToken(req, res, next) {
    let token = req.cookies.token
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, key, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        let role = req.user.role
        if(role == 'admin'||role == 'trainer'){
            next()
            
        }
        else{
            res.sendStatus(403)
        }

    })
}


//history
//using ejs create a xml file to download
dataController.get('/history',authenticateToken, async (req, res) => {
    try {
        let id = req.user.id
        // console.log(id);
        // const sessions = await connection.query("SELECT * FROM gymweb.sessions where user_id = ?",[id]);
        //get session and user data where user_id = id
        const sessions = await connection.query("SELECT * FROM gymweb.sessions INNER JOIN gymweb.users ON gymweb.sessions.user_id = gymweb.users.user_id where gymweb.sessions.user_id = ?",[id]);

        console.log(sessions[0]);
        res.setHeader('content-type', 'text/xml');
        res.render('history.ejs',{sessions:sessions[0]});
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});
    


//today
dataController.get('/today',authenticateToken, async (req, res) => {
    try {
        let id = req.user.id
        const sessions = await connection.query("SELECT * FROM gymweb.sessions where date = CURDATE() AND user_id = ?",[id]);
        console.log(sessions[0]);
        res.setHeader('content-type', 'text/xml');
        res.render('today.ejs',{sessions:sessions[0]});
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});







export default dataController;