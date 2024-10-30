import {User} from '../models/user.js'

export const getAllUsers = async (req, res) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        data: users
    })
}


export const getUserById = async (req, res) => {
    const {id} = req.params

    try {
        const user = await User.findById(id)

        if(user.id !== id) {
            return res.status(401).json({message: "not allowed"})
        }

        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }

        return res.status(200).send(user)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

export const deleteUserById = async (req, res) => {
    const {id} = req.params

    try {

        const user = await User.findByIdAndDelete(id)

        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }

        return res.status(200).send(user)
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}

export const updateUserById = async (req, res) => {
    const {id} = req.params

    try {

        const user = await User.findByIdAndUpdate(
            {_id: id},
            req.body,
            {new: true}
        )

        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }

        return res.status(200).send(user)
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}


