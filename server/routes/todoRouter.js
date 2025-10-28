import {pool} from '../db_helper/db.js';
import { Router } from 'express';

const router = Router()

router.get('/', (req, res, next) => {
 
pool.query('SELECT * FROM task', (err, results) => {
  if (err) {
 return next(err)

  }
  res.status(200).json(results.rows || [] );
  
})
})
router.post('/create', (req, res, next) => {

const { task } = req.body
if (!task) {
return next(error('Task data is missing') )
}
pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [task.description],
(err, result) => {
if (err) {
return next(err)
}
res.status(201).json({id: result.rows[0].id, description: task.description})
})
})
router.delete('/delete/:id', (req, res , next) => {

const {id} = req.params

pool.query('DELETE FROM task WHERE id = $1',
 [id], (error, result) => {
  if (error) {
    return next(error);
  }
  if (result.rowCount === 0) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ id:id});
  
})
});


export default router;