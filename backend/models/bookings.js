import connection from "../db_conn.js";
import express from "express";


export function insertBooking(){
    return connection.query("INSERT INTO gymweb.bookings (user_id,session_id) VALUES (?,?)",[user_id,session_id]);
}