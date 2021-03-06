import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const todos = createSlice({
  name: 'todos',
  initialState: {
    tasks: [
      {id: 1, text: 'enjoy life', done: false, created: moment(new Date()).format()},
      {id: 2, text: 'spread love', done: false, created: moment(new Date()).format()},
      {id: 3, text: 'relax', done: false, created: moment(new Date()).format()}
    ]
  }, 
  reducers: {
    removeItem: (store, action) => {
      const itemId = action.payload;
      const filteredList = store.tasks.filter(item => item.id !== itemId);
      store.tasks = filteredList
    },
    toggleDone: (store, action) => {
      const itemId = action.payload;
      const currentItem = store.tasks.find(item => item.id === itemId);  
      currentItem.done = !currentItem.done;     
    },
    addItem: (store, action) => {
      const newTask = {
        id: store.tasks.length === 0 ? 0 : Math.max(...store.tasks.map(item => item.id)) + 1,
        text: action.payload,
        done: false,
        created: moment(new Date()).format()
      };
      const newTaskList = [...store.tasks, newTask];
      store.tasks = newTaskList;
    },
    markAllDone: (store, action) => {
      const doneList = store.tasks.map((task) => {
        const container = {}
        container.id = task.id;
        container.text = task.text;
        container.done = true;
        return container
      });
      store.tasks = doneList;
    },
    clearDoneTasks: (store, action) => {
      const notDoneList = store.tasks.filter(task => task.done === false);
      store.tasks = notDoneList;
    },
    clearList: (store, action) => {
      const emptyList = [];
      store.tasks = emptyList;
    }
  }
});
