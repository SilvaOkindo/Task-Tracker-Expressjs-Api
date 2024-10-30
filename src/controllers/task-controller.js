import { matchedData, validationResult } from "express-validator"
import { Task } from "../models/task.js"
import { allowedPriorities, allowedStatus } from "../constants/index.js"


export const getTasks = async (req, res) =>  {
    const userId = req.user.id
    try {

        const tasks = await Task.find({userId: userId})

        res.status(200).send({success: true, data: tasks})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getTask = async (req, res) =>  {
    const {id} = req.params
    const userId = req.user.id
    try {

        const task = await Task.findOne({_id: id, userId: userId})

        if(!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            })
        }

        return res.status(200).json({
            success: true,
            data: task
        })
        
    } catch (error) {
        return res.status(500).json({  success: false, message: error.message})
    }
}

export const getTasksByStatus = async (req, res) => {
    const userId = req.user.id
    const {status} = req.params
    try {
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({
                success:false,
                message: "Invalid status"
            })
        }

        const tasks = await Task.find({userId: userId, status: status})
        return res.status(200).json({
            success: true,
            data: tasks
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getTasksByPriority = async (req, res) => {
    const userId = req.user.id
    const {priority} = req.params

    try {
        if(!allowedPriorities.includes(priority)) {
            return res.status(400).json({
                success:false,
                message: "Invalid priority"
            })
        }


        const tasks = await Task.find({userId: userId, priority: priority})
        return res.status(200).json({
            success: true,
            data: tasks
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const addTask = async (req, res) =>  {
    //console.log(req.user, 'user')
    const userId = req.user.id
    if(!userId) {
        return res.status(400).json({
            success: false,
            message: "User id is required"
        })
    }
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }

        const data = matchedData(req)

        const newTask = await Task({...data, userId: userId})

        await newTask.save()

        return res.status(201).json({
            success: true,
            data: newTask
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const editTask = async (req, res) =>  {
    const {id} = req.params
    const userId = req.user.id
        try {

        const task = await Task.findOneAndUpdate(
            {_id: id, userId: userId},
            req.body,
            {new: true}
        )

        if(!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully.'
        })
        
    } catch (error) {
        return res.status(500).json({  success: false, message: error.message})
    }
}

export const changeTaskStatus = async (req, res) => {
    const {status} = req.body
    const userId = req.user.id
    const {id} = req.params

    try {
        if(!status) {
            return res.status(400).json({
                success: false,
                message: "status cannot be empty"
            })
        }

        if(!allowedStatus.includes(status)) {
            return res.status(400).json({
                success:false,
                message: "Invalid status"
            })
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: userId},
            {status: status},
            {new: true}
        )

        if(!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            })
        }



        return res.status(200).json({
            success: true,
            data: task
        })

    }  catch (error) {
        return res.status(500).json({  success: false, message: error.message})
    }
}

export const changeTaskPriority = async (req, res) => {
    const {priority} = req.body
    const userId = req.user.id
    const {id} = req.params

    try {
        if(!priority) {
            return res.status(400).json({
                success: false,
                message: "priority cannot be empty"
            })
        }
        if(!allowedPriorities.includes(priority)) {
            return res.status(400).json({
                success:false,
                message: "Invalid priority"
            })
        }

        const task = await Task.findOneAndUpdate(
            {_id: id, userId: userId},
            {priority: priority},
            {new: true}
        )

        if(!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            })
        }

   

        return res.status(200).json({
            success: true,
            data: task
        })

    }  catch (error) {
        return res.status(500).json({  success: false, message: error.message})
    }
}

export const deleteTask = async (req, res) =>  {
    const {id} = req.params
    const userId = req.user.id
    try {

        const task = await Task.findOneAndDelete({_id: id, userId: userId})

        if(!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully.'
        })
        
    } catch (error) {
        return res.status(500).json({  success: false, message: error.message})
    }
}