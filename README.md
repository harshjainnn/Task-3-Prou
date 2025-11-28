# Employee Task Tracker MVP

A minimal full-stack web application for tracking employee tasks with a simple dashboard, task management, and filtering capabilities.

## Tech Stack

### Frontend
- **React** + **Vite** - Modern React development
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Backend
- **Node.js** + **Express** - Server framework
- **Prisma ORM** - Database toolkit
- **SQLite** - Lightweight database
- **TypeScript** - Type safety

## Project Structure

```
mvp-task-tracker/
├── client/          # React frontend
├── server/          # Express backend
├── prisma/          # Prisma schema and migrations
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create a `.env` file in the `server/` directory with the following content:
```
DATABASE_URL="file:./dev.db"
PORT=4000
```

3. Install dependencies:
```bash
npm install
```

4. Generate Prisma client (schema is at root level):
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Seed the database (optional):
```bash
npm run prisma:seed
```

7. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Create a `.env` file in the `client/` directory with the following content:
```
VITE_API_URL=http://localhost:4000
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Employees
- `GET /employees` - Get all employees

### Tasks
- `GET /tasks` - Get all tasks (supports query params: `employeeId`, `status`)
- `POST /tasks` - Create a new task
  ```json
  {
    "title": "Task title",
    "status": "pending",
    "employeeId": 1
  }
  ```
- `PUT /tasks/:id` - Update a task
  ```json
  {
    "status": "completed",
    "title": "Updated title",
    "employeeId": 2
  }
  ```

### Dashboard
- `GET /dashboard` - Get dashboard statistics
  ```json
  {
    "totalTasks": 10,
    "completedTasks": 5,
    "completionRate": 50
  }
  ```

## Database Schema

### Employee Model
```prisma
model Employee {
  id    Int     @id @default(autoincrement())
  name  String
  tasks Task[]
}
```

### Task Model
```prisma
model Task {
  id          Int     @id @default(autoincrement())
  title       String
  status      String   @default("pending")
  employeeId  Int
  employee    Employee @relation(fields: [employeeId], references: [id])
}
```

## Features

### Core Features
- ✅ View all employees
- ✅ View all tasks
- ✅ Add a new task
- ✅ Update task status
- ✅ Filter tasks by employee & status
- ✅ Dashboard summary (total tasks, completed tasks, completion rate)

### Pages
- **Dashboard** (`/`) - Overview with task statistics
- **Tasks** (`/tasks`) - Task list with filtering
- **Create Task** (`/tasks/new`) - Form to add new tasks

## Environment Variables

### Backend (.env in server/)
```
DATABASE_URL="file:./dev.db"
PORT=4000
```

### Frontend (.env in client/)
```
VITE_API_URL=http://localhost:4000
```

## Development

### Backend Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Screenshots

*Note: Screenshots can be added here after running the application*

## License

MIT

