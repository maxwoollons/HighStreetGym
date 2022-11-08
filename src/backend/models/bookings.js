import connection from "../db_conn.js";

export function getBookings(memberid) {
    return connection.query("SELECT *,DATE_FORMAT(date,'%d %M %Y %h:%i %p')as 'dateformat' FROM highstreetgym.bookings INNER JOIN highstreetgym.sessions ON highstreetgym.bookings.sessionid = highstreetgym.sessions.sessionid INNER JOIN highstreetgym.trainers ON highstreetgym.sessions.trainerid = highstreetgym.trainers.trainerid WHERE memberid = ?",[memberid]);
}



export function makeBooking(memberid, sessionid) {
    return connection.query("INSERT INTO highstreetgym.bookings (memberid, sessionid) VALUES (?, ?)", [memberid, sessionid]);
}


export function checkBooking(memberid, sessionid) {
    return connection.query("SELECT * FROM highstreetgym.bookings WHERE memberid = ? AND sessionid = ?", [memberid, sessionid]);
}


export function deleteBooking(bookingid) {
    return connection.query("DELETE FROM highstreetgym.bookings WHERE bookingid = ?", [bookingid]);
}


export function addCurrentMembers(sessionid) {
    return connection.query("UPDATE highstreetgym.sessions SET currentmembers = currentmembers + 1 WHERE sessionid = ?", [sessionid]);
}

//minus 1 from current members post
export function minusCurrentMembers(sessionid) {
    return connection.query("UPDATE highstreetgym.sessions SET currentmembers = currentmembers - 1 WHERE sessionid = ?", [sessionid]);
}
