import express from 'express';
import userController from './controllers/users.js';
import postController from './controllers/posts.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import sessionController from './controllers/sessions.js';
import bookingController from './controllers/bookings.js';
import statsController from './controllers/stats.js';
import dataController from './controllers/dataexport.js';
import cors from 'cors';


const app = express();
const port = 8080;
let corsOptions = {
    origin: 'https://highstreetgym.xyz/',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));




app.use(cookieParser())


app.set("view engine", "ejs");
app.set("views", "./src/backend/xml");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/users',userController);
app.use('/posts',postController);
app.use('/sessions',sessionController)
app.use('/bookings',bookingController)
app.use('/stats',statsController)
app.use('/data',dataController)









app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);



