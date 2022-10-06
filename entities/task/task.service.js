import { TaskRepository } from './task.repository.js';

export class TaskService {
    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async getTasks() {
        return await this.taskRepository.getTasks();
    }

    async createTask(task) {
        return await this.taskRepository.createTask(task);
    }

    async updateTask(task) {
        return await this.taskRepository.updateTask(task);
    }

    async deleteTask(taskId) {
        return await this.taskRepository.deleteTask(taskId);
    }
}
