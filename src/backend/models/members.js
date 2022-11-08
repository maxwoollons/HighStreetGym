import connection from "../db_conn.js";
import express from "express";


export function getMembers() {
    return connection.query("SELECT * FROM members");
}

//insert member query
export function addMember(fname,lname,email,mobile,dob,password){
    return connection.query("INSERT INTO highstreetgym.members (fname,lname,email,mobile,age,password,role) VALUES (?,?,?,?,?,?,'member')",[fname,lname,email,mobile,dob,password]);
}


export function loginMember(email,password){
    return connection.query("SELECT * FROM highstreetgym.members WHERE email = ?",[email]);
}

//get user by id 
export function getMemberById(id){
    return connection.query("SELECT * FROM highstreetgym.members WHERE memberid = ?",[id]);
}