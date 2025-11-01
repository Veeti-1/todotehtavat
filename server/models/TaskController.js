import { ApiError } from "../db_helper/apierror.js";
import { selectAllTasks, insertTask, deleteTaskById } from "./Task.js";

const getTasks = async (req,res,next) => {
    try {
        const result = await selectAllTasks();
        res.status(200).json(result.rows || [])
    } catch (error) {
      return  next (error)
    }
}

const postTask = async (req, res, next) => {
    const {task} = req.body;
    try {
    if (!task || !task.description || task.description.trim().length === 0) {
        return next ( new ApiError('Task description is required', 400))
        /*
        const error = new Error('Task description is required');
        error.status = 400;
        return next(error);*/
    }
    const result = await insertTask(task.description);
    res.status(201).json({id: result.rows[0].id, description: result.rows[0].description})
}catch (error) {
        return next (new ApiError(error.message, 500))

}
}

const deleteTask = async (req, res, next) => {
    const {id} = req.params;
    try {
    const result = await deleteTaskById(id);
    if (result.rowCount === 0) {
        return next ( new ApiError('Task not found', 404))
    }
    res.status(200).json({id: id});
}
catch (error) {
    return next (new ApiError(error.message, 500))
}
}
export {getTasks, postTask, deleteTask}