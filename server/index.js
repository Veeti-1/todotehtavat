import express from 'express'
import cors from 'cors'
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'
import {pool} from './db_helper/db.js'
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter)
app.use('/', todoRouter)

app.listen(port)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    error:{
      message: err.message,
      status: statusCode
    }
  })  
})
console.log(`Server is running on port ${port}`);

export default app;
