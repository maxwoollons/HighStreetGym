import connection from "../db_conn.js";

export function getClasses() {
    return connection.query("SELECT * FROM sessions");
}



//get classes with datetime of today
//todo: fix this shit ffs
export function getClassesToday() {
    return connection.query("SELECT * sessions WHERE date = CURDATE()");
}


export function  getTrainerSessions(){
    return connection.query("SELECT * FROM highstreetgym.sessions WHERE member  = ?",[id]);
}