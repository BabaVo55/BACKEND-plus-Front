import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router()

router.post('/register', (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const hashedPassword2 = bcrypt.hashSync(password, 8);
    // Save the new user and hashed password to the db;

    try{
        const insertUser = db.prepare(`INSERT INTO users(username, password) 
            VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword);

        // now that we have a user, i want to add their first todo for them

        const defaultTodo = `Hello :) enter your first task`

        const insertTodo = db.prepare(`INSERT INTO todos (user_id,task)
            VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: `24`})
    }catch(error){
        console.log(error.message)
        res.sendStatus(503)
    }
    console.log(hashedPassword)
    console.log(hashedPassword2)
    console.log(username, password);

    !username && res.send('no username detected')

})

router.post('/login', (req, res) => {
    
})

export default router