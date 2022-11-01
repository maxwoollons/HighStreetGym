import express, { application } from 'express';
import connection from '../db_conn.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import dotenv from 'dotenv';



dotenv.config()



const userController = express.Router();
 const key = process.env.SECRET_KEY;


userController.get('/', async (req, res) => {
    res.json("working")
});



userController.post('/register', async (req, res) => {
    try {
        let {email, password,name} = req.body;
        email = validator.escape(email);
        //check to see if email has been used before
        let results = await connection.query("SELECT * FROM gymweb.users WHERE email = ?", [email]);
        console.log(results[0]);
        if (results[0].length > 0) {
            return res.json({message: "email already in use"}).status(500);
        }
        else {
        const encryptedPassword = await bcryptjs.hash(password, 6);
        const user = await connection.query("INSERT INTO gymweb.users (name,email, password,role) VALUES (?,?, ?,'user')",[name,email, encryptedPassword]);
        res.json({message: "user added"}).status(200);
        console.log(user);
    }

    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }

});



userController.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await connection.query("SELECT * FROM gymweb.users WHERE email = ?",[email]);
    if (user[0].length == 0) {
        res.json({message: "Incorrect username or password"}).status(404);
    }
    else {
        const validPassword = await bcryptjs.compare(password, user[0][0].password);
        if (validPassword) {
            console.log(user[0][0]);
            const token = jwt.sign({id: user[0][0].user_id,role: user[0][0].role}, key,{expiresIn: '1h'});
            res.cookie("token", token, {httpOnly: true});
            res.json({message: "logged in", token: token}).status(200);
        }
        else {
            res.json({message: "Incorrect username or password"}).status(401);
        }
    }
});




userController.get('/loginstatus',authenticateToken, async(req, res) => {
    res.json(req.user)

})

function authenticateToken(req, res, next) {
    let token = req.cookies.token
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, key, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        console.log(user)
        next()
    })
}


userController.get('/logout', async(req, res) => {
    res.clearCookie("token");
    res.json({message: "logged out"}).status(200);
})




export default userController;
