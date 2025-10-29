import {pool} from '../db_helper/db.js';
import { Router } from 'express';
import {auth} from '../db_helper/auth.js';
const router = Router()

router.get('/', (req, res) => {
 
pool.query('SELECT * FROM task', (err, results) => {
  if (err) {
 return res.status(500).json({ error: err.message });

  }
  res.status(200).json(results.rows);
  
})
})
router.post('/create',auth,(req, res, next) => {

const { task } = req.body
if (!task) {
return res.status(400).json({ error: 'Task description is required' });
}
pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [task.description],
(err, result) => {
if (err) {
return next(err)
}
res.status(201).json({id: result.rows[0].id, description: task.description})
})
})
router.delete('/delete/:id',auth,(req, res , next) => {

const {id} = req.params

pool.query('DELETE FROM task WHERE id = $1',
 [id], (error, result) => {
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (result.rowCount === 0) {
    const error = new Error('Task not found');
    
    return next(error);
  }
  res.status(200).json({ id:id});
  
})
});


export default router;