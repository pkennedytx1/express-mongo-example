import { connect, disconnect } from '../config/dbConfig.js';
import { faker } from '@faker-js/faker';
import { Task } from '../entities/task/task.model.js';
import dotenv from 'dotenv';

const seedTasks = async () => {
    dotenv.config();
    connect();
    const taskArray = [];
    for(let i = 0; i < 20; i++) {
        const task = {
            name: faker.lorem.word(),
            description: faker.lorem.sentence(),
        }
        taskArray.push(task);
    }
    await Task.insertMany(taskArray);
    console.log('Inserted 20 Tasks');
}

seedTasks().then(() => {
    disconnect();
})