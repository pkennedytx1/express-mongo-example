import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { TaskController } from './entities/task/task.controller.js';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { UserController } from './entities/user/user.controller.js';
import { authenticateToken } from './config/jwtConfig.js';

// Initital Configurations
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const taskController = new TaskController();
const userController = new UserController();

// Middleware
app.use(bodyParser.json());

// ***** Endpoints *****
// User Endpoints
app.post('/api/signup', (req, res) => {
    userController.signup(req.body.user).then(data => res.json(data));
})
// Task Endpoints
app.get('/api/tasks', authenticateToken, (req, res) => {
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

app.get('/supersaiyanpatrick', (req, res) => {
    res.sendFile('view/index.html', { root: __dirname })
});

app.get('/', (req, res) => {
    res.send(`<h1>Task API is working!</h1>`)
});

// Server creation
app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})