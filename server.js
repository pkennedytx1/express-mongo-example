import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { TaskController } from './entities/task/task.controller.js';

// Initital Configurations
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;
const taskController = new TaskController();

// Middleware
app.use(bodyParser.json());

// Endpoints
app.get('/api/tasks', (req, res) => {
    taskController.getTasks().then(data => res.json(data));
});

app.post('/api/task', (req, res) => {
    taskController.createTask(req.body.task).then(data => res.json(data));
});

app.put('/api/task', (req, res) => {
    taskController.updateTask(req.body.task).then(data => res.json(data));
});

app.delete('/api/task/:id', (req, res) => {
    taskController.deleteTask(req.params.id).then(data => res.json(data));
});

app.get('/', (req, res) => {
    res.send(`<h1>Task API is working!</h1>`)
});

// Server creation
app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})