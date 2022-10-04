import connection from '../db_conn.js';



export function getAllPosts(){
    return connection.query("SELECT * FROM gymweb.posts");
}


export function getFewPosts(){
    return connection.query("SELECT * FROM gymweb.posts LIMIT 3");
}