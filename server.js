import express from 'express';
import http from 'http'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import * as swaggerUI from 'swagger-ui-express';
import { TaskController } from './entities/task/task.controller.js';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { UserController } from './entities/user/user.controller.js';
import { authenticateToken } from './config/jwtConfig.js';
import { Server } from 'socket.io';
import Redis from 'ioredis';

// Initital Configurations
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const taskController = new TaskController();
const userController = new UserController();
const swaggerDocument = await import('./swagger.json', { assert: { type: 'json' }});
// *** initialize our Redis connection ***
const redis = new Redis({
    host: 'localhost',
    port: 6379,
    password: 'patty'
});
// *** initialize our socket system ***
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
    }
})
// *** initialize our context ***
const context = {
    redis,
    io
}

// Middleware
app.use(cors());
// *** body parser middleware ***
app.use(bodyParser.json());
// *** swagger middleware ***
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument.default));

// ***** Endpoints *****
app.get('/', (req, res) => {
    return res.json("Howdy Hey")
})
// User Endpoints
app.post('/api/signup', (req, res) => {
    userController.signup(req.body.user).then(data => res.json(data));
})

app.post('/api/login', (req, res) => {
    userController.login(req.body.user).then(data => res.json(data));
})
// Task Endpoints
app.get('/api/tasks', authenticateToken, (req, res) => {
    taskController.getTasks().then(data => res.json(data));
});

app.post('/api/task', (req, res) => {
    taskController.createTask(req.body.task, context).then(data => res.json(data));
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

// Pub Sub Connection
io.on('connection', (socket) => {
    console.log('a user connected');
});
// Server creation
server.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
})