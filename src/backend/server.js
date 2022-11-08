import express from 'express';
import classController from './controllers/classes.js';
import session from 'express-session'
import memberController from './controllers/members.js';
import bookingsController from './controllers/bookings.js';
import updateController from './controllers/statusupdate.js';

const app = express();
const port = 8080;


//session setup cookie save
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));


app.set("view engine", "ejs");
app.set("views", "./src/backend/xml");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//init express sessions





app.use('/classes', classController);
app.use('/members', memberController);
app.use('/bookings', bookingsController);
app.use('/updatepos', updateController);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);