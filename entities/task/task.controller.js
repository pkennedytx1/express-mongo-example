import { TaskService } from './task.service.js';

export class TaskController {
    constructor() {
        this.taskService = new TaskService();
    }
    async getTasks() {
        console.log('Controller: getTasks')
        return await this.taskService.getTasks();
    }

    async createTask(task) {
        console.log('Controller: createTask', task);
        return await this.taskService.createTask(task);
    }

    async updateTask(task) {
        console.log('Controller: updateTask', task);
        return await this.taskService.updateTask(task);
    }

    async deleteTask(taskId) {
        console.log('Controller: deleteTask', taskId);
        return await this.taskService.deleteTask(taskId);
    }
}
