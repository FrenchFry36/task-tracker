import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';

const allTasks = new Map();

allTasks
  .set(uuidv4(), {
    title: 'Re-work UI/UX',
    priority: 'Low',
    releaseDate: '12/05/2025',
    assignedTo: 'Said, Rachael',
    projectName: 'Time App',
  })
  .set(uuidv4(), {
    title: 'Dark mode toggle',
    priority: 'High',
    releaseDate: '09/03/2025',
    assignedTo: 'Umair, Precious',
    projectName: 'ASA Darkmode Feature',
  })
  .set(uuidv4(), {
    title: 'Accessibility checks',
    priority: 'Medium',
    releaseDate: '15/04/2025',
    assignedTo: 'Michael, Ricardo',
    projectName: 'Time App',
  })
  .set(uuidv4(), {
    title: 'Notification integration',
    priority: 'High',
    releaseDate: '11/03/2025',
    assignedTo: 'Ebtesam, Deborah',
    projectName: 'Time App',
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
