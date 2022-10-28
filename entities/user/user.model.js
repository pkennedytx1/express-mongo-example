import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username: 'string', 
        email: 'string', 
        password: 'string',
        createDate: 'date', 
        updatedDate: 'date', 
    }, {
        timestamps: {
            createDate: 'created_at',
            updatedDate: 'updated_at'
        }
    });

export const User = mongoose.model('users', userSchema);
