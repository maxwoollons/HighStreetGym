import express from "express";

import {getClasses, getClassesToday} from "../models/classes.js";


const classController = express.Router();

classController.get("/all", (req, res) => {
    getClasses().then(classes => {
        res.status(200).json(classes[0]);
    }
    ).catch(err => {
        res.json(err);
    }   
    );
}
);

classController.get("/today", (req, res) => {
    getClassesToday().then(classes => {
        res.status(200).json(classes[0]);
    }
    ).catch(err => {
        res.json(err);
    }   
    );
}
);


classController.get("/trainersessions/:id", (req, res) => {
    getTrainerSessions(req.params.id).then(classes => {
        res.status(200).json(classes[0]);
    }
    ).catch(err => {
        res.status(400).json(err);
    }
    );
}
);




export default classController