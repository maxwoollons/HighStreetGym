import express from 'express';
import connection from '../db_conn.js';
import jwt from 'jsonwebtoken';

const statsController = express.Router();
const key = process.env.SECRET_KEY;


statsController.get('/usernum',authenticateToken,async(req,res)=>{
    try{
    const users = await connection.query("SELECT COUNT(*) as users FROM gymweb.users");
    res.json(users[0][0]);
}
catch(err){
    res.json({message: "error"}).status(500);
    console.log(err);
}
});


statsController.get('/sessionnum',authenticateToken,async(req,res)=>{
    const sessions = await connection.query("SELECT COUNT(*) FROM gymweb.sessions");
    res.json(sessions[0]);
}
);

statsController.get('/postnum',authenticateToken,async(req,res)=>{
    const posts = await connection.query("SELECT COUNT(*) FROM gymweb.posts");
    res.json(posts[0]);
}
);


statsController.get('/accage',authenticateToken,async(req,res)=>{
    try{
    const user = await connection.query("SELECT * FROM gymweb.users WHERE user_id = ?",[req.user.id]);
    const date = new Date();
    const accage = Math.round((date - user[0][0].created)/(1000*60*60*24));
    res.json({accage: accage});
}
catch(err){
    res.json({message: "error"}).status(500);
    console.log(err);
}
});






function authenticateToken(req, res, next) {
    let token = req.cookies.token
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, key, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        // console.log(user)
        if(user.role == "admin" || user.role == "trainer"){
        next()
        }
        else {
            res.json({message: "unauthorized"}).status(401);
        }
    })
}




export default statsController;