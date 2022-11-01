import express from 'express';
import connection from '../db_conn.js';
import {getAllPosts,getFewPosts,createPost} from '../models/posts.js';

const postController = express.Router();

postController.get('/all', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts[0]);

});


postController.get('/few', async (req, res) => {
    const posts = await getFewPosts();
    res.json(posts[0]);

});

postController.post('/create', async (req, res) => {
    try {
        const {title, content, user_id} = req.body
        const post = await createPost(user_id, title, content);
        res.json({message: "post added"}).status(200);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});

postController.post('/myposts', async (req, res) => {
    try {
        const id = req.body.id;
        const posts = await connection.query('SELECT * FROM gymweb.posts WHERE user_id = ?', [id]);
        res.json(posts[0]);
        
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});


postController.delete('/delete', async (req, res) => {
    try {
        const id = req.body.post_id;
        const posts = await connection.query('DELETE FROM gymweb.posts WHERE post_id = ?', [id]);
        res.json({message: "post deleted"}).status(200);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});



postController.post('/like', async (req, res) => {
    try {
        //add 1 to likes in posts table by post_id
        const id = req.body.post_id;
        const posts = await connection.query('UPDATE gymweb.posts SET likes = likes + 1 WHERE post_id = ?', [id]);
        res.json({message: "post liked"}).status(200);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});

//get post data by id
postController.post('/post', async (req, res) => {
    try {
        const id = req.body.post_id;
        const posts = await connection.query('SELECT * FROM gymweb.posts WHERE post_id = ?', [id]);
        res.json(posts[0]);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});


//update post by id title body
postController.put('/update', async (req, res) => {
    try {
        const {title, content, postId} = req.body;
        const posts = await connection.query('UPDATE gymweb.posts SET title = ?, content = ? WHERE post_id = ?', [title, content, postId]);
        res.json({message: "post updated"}).status(200);
    }
    catch (err) {
        res.json({message: "error"}).status(500);
        console.log(err);
    }
});






export default postController;