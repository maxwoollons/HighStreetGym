import express from 'express';
import connection from '../db_conn.js';
import {getAllPosts,getFewPosts} from '../models/posts.js';

const postController = express.Router();

postController.get('/all', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts[0]);

});


postController.get('/few', async (req, res) => {
    const posts = await getFewPosts();
    res.json(posts[0]);

});

export default postController;