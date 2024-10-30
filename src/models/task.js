import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'todo',
        enum: ['todo', 'inprogress', 'completed']
    },
    priority: {
        type: String,
        enum: ['high', 'low', 'medium'],
        default: 'low'
    }
})

export const Task = mongoose.model('Task', taskSchema)