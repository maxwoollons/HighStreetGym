import connection from "../db_conn.js";

export function minusOneFromCurrentMembers(sessionid) {
    return connection.query("UPDATE highstreetgym.sessions SET currentmembers = currentmembers - 1 WHERE sessionid = ?", [sessionid]);
}


//get booking by bookingid
export function getBookingById(bookingid) {
    return connection.query("SELECT *,DATE_FORMAT(date,'%d %M %Y %h:%i %p')as 'dateformat' FROM highstreetgym.bookings INNER JOIN highstreetgym.sessions ON highstreetgym.bookings.sessionid = highstreetgym.sessions.sessionid INNER JOIN highstreetgym.trainers ON highstreetgym.sessions.trainerid = highstreetgym.trainers.trainerid WHERE bookingid = ?", [bookingid]);
}