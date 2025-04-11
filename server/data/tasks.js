import { v4 as uuidv4 } from "uuid";

export const allTasks = new Map();

allTasks
  .set(uuidv4(), {
    title: "Re-work UI/UX",
    priority: "Low",
    releaseDate: "12/05/2025",
    assignedTo: "Said, Rachael",
    projectName: "Time App",
  })
  .set(uuidv4(), {
    title: "Dark mode toggle",
    priority: "High",
    releaseDate: "09/03/2025",
    assignedTo: "Umair, Precious",
    projectName: "ASA Darkmode Feature",
  })
  .set(uuidv4(), {
    title: "Accessibility checks",
    priority: "Medium",
    releaseDate: "15/04/2025",
    assignedTo: "Michael, Ricardo",
    projectName: "Time App",
  })
  .set(uuidv4(), {
    title: "Notification integration",
    priority: "High",
    releaseDate: "11/03/2025",
    assignedTo: "Ebtesam, Deborah",
    projectName: "Time App",
  });
