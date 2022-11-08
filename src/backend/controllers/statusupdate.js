import {minusOneFromCurrentMembers,getBookingById} from "../models/statusupdate.js";
import express from "express";


const updateController = express.Router();



//minus one from current members
updateController.post("/minusone/:sessionid", (req, res) => {
    minusOneFromCurrentMembers(req.params.sessionid).then(session => {
        res.status(200).json(session);
    }
    ).catch(err => {
        res.json(err);
    }
    );
}
);

//get booking by id
updateController.get("/booking/:bookingid", (req, res) => {
    getBookingById(req.params.bookingid).then(booking => {
        res.status(200).json(booking);
    }
    ).catch(err => {
        res.json(err);
    }
    );
}
);












export default updateController;