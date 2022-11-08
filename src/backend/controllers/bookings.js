import express from 'express'
import { getBookings,makeBooking,checkBooking,deleteBooking,addCurrentMembers,minusCurrentMembers } from '../models/bookings.js';


const bookingsController = express.Router()


//get bookings by memberid
bookingsController.get('/:memberid', (req, res) => {
    getBookings(req.params.memberid).then(bookings => {
        res.status(200).json(bookings[0]);
    }
    ).catch(err => {
        res.json(err);
    }   
    );
}
);


//make booking by memberid for session id and check to make sure the member isn't already booked for that session
bookingsController.post('/:memberid/:sessionid', (req, res) => {
    getBookings(req.params.memberid).then(bookings => {
        if (bookings[0].sessionid === req.params.sessionid) {
            res.status(400).json({
                message: "You are already booked for this session"
            });
        } else {
            makeBooking(req.params.memberid, req.params.sessionid).then(booking => {
                res.status(200).json(booking);
            }
            ).catch(err => {
                res.json(err);
            }
            );
        }
    }
    ).catch(err => {
        res.json(err);
    }
    );
}
);


//check to see if the member is already booked for the session
bookingsController.get('/:memberid/:sessionid', (req, res) => {
    checkBooking(req.params.memberid, req.params.sessionid).then(booking => {
        console.log(booking[0]);
        if (booking[0].length > 0) {
            res.status(200).json({
                booked: "true"
            });
        } else {
            res.status(200).json({
                booked: "false"
            });
        }
    }
    ).catch(err => {
        res.json(err);
    }
    );
}
);

bookingsController.delete('/:bookingid', (req, res) => {
    deleteBooking(req.params.bookingid).then(booking => {
        res.status(200).json(booking);
    }
    ).catch(err => {
        res.json(err);
    }
    );
}
);


//add +1 to current members post
bookingsController.post('/:sessionid', (req, res) => {
    addCurrentMembers(req.params.sessionid).then(booking => {
        res.status(200).json(booking);
    }
    ).catch(err => {
        res.json(err);
    }
    );
}
);






export default bookingsController;

