import { v4 as uuidv4 } from "uuid";

export const allTasks = new Map();

const id1 = uuidv4();
const task1 = {
  id: id1,
  title: "Re-work UI/UX",
  priority: "Low",
  releaseDate: "12/05/2025",
  assignedTo: "Said, Rachael",
  projectName: "Time App",
};
const id2 = uuidv4();
const task2 = {
  id: id2,
  title: "Dark mode toggle",
  priority: "High",
  releaseDate: "09/03/2025",
  assignedTo: "Umair, Precious",
  projectName: "ASA Darkmode Feature",
};
const id3 = uuidv4();
const task3 = {
  id: id3,
  title: "Accessibility checks",
  priority: "Medium",
  releaseDate: "15/04/2025",
  assignedTo: "Michael, Ricardo",
  projectName: "Time App",
};
const id4 = uuidv4();
const task4 = {
  id: id4,
  title: "Notification integration",
  priority: "High",
  releaseDate: "11/03/2025",
  assignedTo: "Ebtesam, Deborah",
  projectName: "Time App",
};

allTasks.set(id1, task1).set(id2, task2).set(id3, task3).set(id4, task4);
