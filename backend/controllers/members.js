import {addMember,loginMember,getMemberById} from "../models/members.js";
import express from "express";
import validator from "validator";
import bcrypt from "bcryptjs";
import session from "express-session";
import connection from "../db_conn.js";


const memberController = express.Router();


memberController.post("/add", (req, res) => {
    connection.query("SELECT * FROM highstreetgym.members WHERE email = ?",[req.body.email])
    .then((result) => {
    console.log(result);
        if(result.length > 0){
            res.json({'error': 'Email already exists'});

        }else{


    
    addMember(validator.escape(req.body.fname), validator.escape(req.body.lname), validator.escape(req.body.email), validator.escape(req.body.mobile), validator.escape(req.body.dob), req.body.password).then(member => {
        res.status(200).json(member);
    }
    ).catch(err => {
        res.json(err);
    }
    );

}})

}

);

//login member check username and password
memberController.post("/login", (req, res) => {
    let email = validator.escape(req.body.email);
    let password = req.body.password;
    loginMember(email)
    .then(member => {
        if (member[0].length > 0) {
            let compare = bcrypt.compareSync(password, member[0][0].password)
            console.log(compare);
           if (compare) {
            console.log("login success");
                res.status(200).json(member[0][0]);
                req.session.user = {
                    userid: member[0][0].memberid,
                    fname: member[0][0].fname,
                    role: member[0][0].role
                };
                req.session.save();
                console.log(req.session.user);


            } else {
            console.log("password incorrect");

                res.status(401).json({error: "password incorrect"});


            }

        } else {
            res.status(401).json({error: "email not found"});
            console.log("email incorrect");

        }
    }
    ).catch(err => {
        res.json(err);
        console.log(err)
    }

    );
}
);
    

memberController.get("/check", (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(401).json({error: "user not logged in"});
    }
}
);

//member logout
memberController.get("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).json({message: "logout success"});
}
);

//get member by id
memberController.get("/:id", (req, res) => {
    getMemberById(req.params.id).then(member => {
        res.status(200).json(member[0]);
    }
    ).catch(err => {
        res.json(err);
    }
    );
}
);





export default memberController;