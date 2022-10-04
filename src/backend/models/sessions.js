import connection from "../db_conn.js";


//get all sessions from database within the current week and return them

export function getAllSessionsWeek(){
    return connection.query("SELECT *,NULL AS password, date_format(date, '%d/%m/%y') as fdate FROM gymweb.sessions INNER JOIN gymweb.users ON sessions.user_id = users.user_id WHERE date >= CURDATE() AND date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)");
}



export function getSessionsByUserId(id){
    return connection.query("SELECT *, date_format(date, '%d/%m/%y') as fdate FROM gymweb.sessions WHERE user_id = ? AND date >= CURDATE()",[id]);
}


export function createSession(user_id,date, time,name, capacity){
    return connection.query("INSERT INTO gymweb.sessions (user_id, date, time,name, max_space) VALUES (?,?,?,?,?)",[user_id, date, time,name, capacity]);
}



export function getSessionBySessionId(id){
    return connection.query("SELECT *, date_format(date, '%d/%m/%y') as fdate FROM gymweb.sessions WHERE session_id = ?",[id]);
}