import express, { Request, Response } from 'express';
import { tasks } from './data/tasks';
import { TaskData } from './types/taskTypes';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/api', (_, res: Response) => {
    res.send('Hello World!');
});

app.get('/api/tasks', (_: Request, res: Response) => {
    try {
        res.status(200).json(tasks)
    } catch (error) {
        res.status(400).json({ message: "Error finding tasks" })
    }
})

app.get('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params
    const findTask = tasks.find(task => task.id === parseInt(id))

    try {
        res.status(200).json(findTask)
    } catch (error) {
        res.status(400).json({ message: "Error finding task" })
    }
})

app.post('/api/tasks', (req: Request, res: Response) => {
    const createNewTask = req.body

    const newTask: TaskData = {
        id: createNewTask.id,
        todo: createNewTask.todo
    }

    const addTask = tasks.push(newTask)

    try {
        res.status(201).json(addTask)
    } catch (error) {
        res.status(401).json({ message: "Error creating new task" })
    }
})

app.put('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body

    const findTaskToEdit = tasks.find(task => task.id === parseInt(id))

    findTaskToEdit.todo = data.todo

    try {
        res.status(202).json(findTaskToEdit)
    } catch (error) {
        res.status(403).json({ message: "Error updating the task" })
    }
})

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params

    const deleteTask = tasks.splice(parseInt(id) - 1, parseInt(id) - 1)

    try {
        res.status(200).json(deleteTask)
    } catch (error) {
        res.status(400).json({ message: "Error when you try to delete task" })
    }
})

app.listen(port, () => {
    console.log(`Server Running Up on port ${port}`);
});
