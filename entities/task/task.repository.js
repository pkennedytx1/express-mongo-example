import { connect } from '../../config/dbConfig.js';
import { Task } from './task.model.js';

export class TaskRepository {
    constructor() {
        connect();
    }

    async getTasks() {
        const tasks = await Task.find({});
        console.log('tasks:::', tasks);
        return tasks;
    }

    async createTask(task) {
        let data = {};
        try {
            data = await Task.create(task);
        } catch(err) {
            console.error('Error::' + err);
        }
        return data;
    }

    async updateTask(task) {
        let data = {};
        try {
            data = await Task.updateOne(task);
        } catch(err) {
            console.error('Error::' + err);
        }
        return data;
    }

    async deleteTask(taskId) {
        let data = {};
        try {
            data = await Task.deleteOne({_id : taskId});
        } catch(err) {
            console.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }
}
