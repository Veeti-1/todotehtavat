import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'


const __dirname = import.meta.dirname


const initializeTestDb = () => {
    const sql = fs.readFileSync(path.join(__dirname, '../db.sql'), 'utf8')
    pool.query(sql, (err) => {
        if (err) {
            console.error('Error initializing database:', err)
        } else {
            console.log('Database initialized successfully')
        }
    }) 
}

const insertTestUser = (user) => {
    hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err)
            return
        }
        pool.query('INSERT INTO account (email, password) VALUES ($1, $2) ',
        [user.email, hashedPassword], (error, result) => {
            if (error) {
                console.error('Error inserting test user:', error)
            }else
            {
                console.log('Test user inserted successfully')
            }
        })
    })
}
const getToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET)
}

export{ initializeTestDb, insertTestUser, getToken }