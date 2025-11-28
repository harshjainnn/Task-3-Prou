import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create employees
  const employee1 = await prisma.employee.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'John Doe',
    },
  });

  const employee2 = await prisma.employee.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Jane Smith',
    },
  });

  const employee3 = await prisma.employee.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Bob Johnson',
    },
  });

  // Create tasks
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Design homepage',
      status: 'completed',
      employeeId: employee1.id,
    },
  });

  await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Implement API endpoints',
      status: 'in-progress',
      employeeId: employee2.id,
    },
  });

  await prisma.task.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Write documentation',
      status: 'pending',
      employeeId: employee3.id,
    },
  });

  await prisma.task.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'Fix bug in login',
      status: 'pending',
      employeeId: employee1.id,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

