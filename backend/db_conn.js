import mysql2 from 'mysql2/promise';

const connection = mysql2.createPool({
    host: '220.239.3.153',
    user: 'highstreet',
    password: 'password1',
    port: '3306',
});

export default connection;

