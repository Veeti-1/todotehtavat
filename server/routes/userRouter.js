import {pool} from '../db_helper/db.js';
import { Router } from 'express';
import {compare, hash} from 'bcrypt';
import jwt from 'jsonwebtoken';

const {sign} = jwt;

const router = Router()

router.post('/signup', async (req, res, next) => {
    const {user} = req.body;
    if (!user || !user.email || !user.password) {
        const error = new Error('email or password are required');
        error.status = 400;
        return next(error)
    }
    hash(user.password, 10, (err, hashedPassword) => {

        if (err) {
            return next(err);
        }
        pool.query('INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *',
        [user.email, hashedPassword], (error, result) => {
            if (error) {
                return next(error);
            }
            res.status(201).json({id: result.rows[0].id, email: user.email});
        })
    })
})
router.post('/signin', (req, res, next) => {
    const {user} = req.body;
    if (!user || !user.email || !user.password) {
        const error = new Error('email and password are required');
        return next(error)
    }
    pool.query('SELECT * FROM account WHERE email = $1', [user.email], (error, result) => {
        if (error) {
            return next(error);
        }
        if (result.rows.length === 0) {
            const err = new Error('user not found');
            err.statusCode = 404;
            return next(err);
        }
        const dbUser = result.rows[0];
        compare(user.password, dbUser.password, (err, isMatch) => {
            if (err) {
                return next(err);
            }
            if (!isMatch) {
                const error = new Error('invalid password');
                error.statusCode = 401;
                return next(error);
            }
            const token = sign({user : dbUser.email}, process.env.JWT_SECRET);
            res.status(200).json({
                id: dbUser.id,
                email : dbUser.email,
                token
            })
        })
        })

});

export default router;
