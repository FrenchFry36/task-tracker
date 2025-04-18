import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { allTasks } from '../../../server/data/tasks.js';

export const handlers = [
  http.get('/api/tasks', () => {
    return new HttpResponse(JSON.stringify(Array.from(allTasks.values())), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
  http.post('/api/login', async ({ request }) => {
    const credentials = await request.json();

    // Demo user credentials
    if (
      credentials.username === 'demo' &&
      credentials.password === 'password123'
    ) {
      return new HttpResponse(
        JSON.stringify({
          success: true,
          username: 'demo',
          name: 'Demo User',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: false,
        message: 'Invalid username or password',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }),
  http.post('/api/tasks', async ({ request }) => {
    const task = await request.json();

    console.log('task', task);

    if (!task.title || !task.projectName) {
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
