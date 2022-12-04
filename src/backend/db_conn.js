import mysql2 from 'mysql2/promise';

const connection = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '38?a5W.9',
    port: '3306',
});

export default connection;

