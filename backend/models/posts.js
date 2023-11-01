import connection from '../db_conn.js';



export function getAllPosts(){
    return connection.query("SELECT * FROM gymweb.posts INNER JOIN gymweb.users ON posts.user_id = users.user_id order by post_id desc LIMIT 10 ");
}


export function getFewPosts(){
    return connection.query("SELECT * FROM gymweb.posts order by post_id desc LIMIT 3");
}

export function createPost(user_id, title, content){
    return connection.query("INSERT INTO gymweb.posts (user_id, title, content) VALUES (?,?,?)",[user_id, title, content]);
}
