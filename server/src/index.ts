import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Get all employees
app.get('/employees', async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Get all tasks
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const { employeeId, status } = req.query;
    
    const where: any = {};
    if (employeeId) {
      where.employeeId = parseInt(employeeId as string);
    }
    if (status) {
      where.status = status;
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        employee: true,
      },
      orderBy: { id: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Add a new task
app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { title, status, employeeId } = req.body;

    if (!title || !employeeId) {
      return res.status(400).json({ error: 'Title and employeeId are required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        status: status || 'pending',
        employeeId: parseInt(employeeId),
      },
      include: {
        employee: true,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task status
app.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, title, employeeId } = req.body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (title) updateData.title = title;
    if (employeeId) updateData.employeeId = parseInt(employeeId);

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        employee: true,
      },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Dashboard summary
app.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const totalTasks = await prisma.task.count();
    const completedTasks = await prisma.task.count({
      where: { status: 'completed' },
    });
    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    res.json({
      totalTasks,
      completedTasks,
      completionRate,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});