import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  reqtask: 'id, task', 
  progtask: 'id, task', 
  fintask: 'id, task', 
});