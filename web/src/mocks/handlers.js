import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';

const allTasks = new Map();

allTasks.set(uuidv4(), {
  name: 'Task 1',
  status: 'OPEN',
});

export const handlers = [
  http.get('/api/tasks', () => {
    return new HttpResponse(JSON.stringify(Array.from(allTasks.values())), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
  http.post('/api/tasks', async ({ request }) => {
    const task = await request.json();

    console.log('task', task);

    if (!task.name || !task.status) {
      return new HttpResponse(null, {
        status: 400,
        body: JSON.stringify({ message: 'Please provide a valid task' }),
      });
    }

    allTasks.set(uuidv4(), task);
    return new HttpResponse(JSON.stringify(task), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
  http.delete('/api/tasks/:id', ({ params }) => {
    const id = params.id;
    allTasks.delete(id);
    return new HttpResponse(null, { status: 204 });
  }),
  http.put('/api/tasks/:id', async ({ params, request }) => {
    const id = params.id;
    const task = await request.json();
    allTasks.set(id, task);
    return new HttpResponse(JSON.stringify(task), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
