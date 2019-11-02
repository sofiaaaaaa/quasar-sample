import Vue from 'vue';
import { uid } from 'quasar';

/* eslint-disable */

const state = {
  tasks: {
    ID1: {
      name: 'a',
      completed: true,
      dueDate: '2018/06/14',
      dueTime: '15:30'
    },
    ID2: {
      name: 'c',
      completed: false,
      dueDate: '2010/06/14',
      dueTime: '12:30'
    },
    ID3: {
      name: 'b',
      completed: false,
      dueDate: '2011/06/14',
      dueTime: '12:30'
    },
    ID4: {
      name: 'zzz',
      completed: false,
      dueDate: '2012/06/14',
      dueTime: '1:30'
    },
    ID5: {
      name: 'bb',
      completed: false,
      dueDate: '2014/06/14',
      dueTime: '2:30'
    }
  },
  search: '',
  sort: 'dueDate'
};

const mutations = {
  updateTask(state, payload) {
    console.log(payload, 'mutation');
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    // console.log('delete id:', id);
    // delete state.tasks[id];
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
    console.log('sorttt', state.sort);
  }
};

const actions = {
  updateTask({ commit }, payload) {
    console.log('updateTask action');
    console.log('payload', payload);
    commit('updateTask', payload);
  },
  deleteTask({ commit }, id) {
    commit(`deleteTask`, id);
  },
  addTask({ commit }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };
    commit('addTask', payload);
  },
  setSearch({ commit }, value) {
    commit('setSearch', value);
  },
  setSort({ commit }, value) {
    commit('setSort', value);
  }
};

const getters = {
  tasksSorted: state => {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks);

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
        taskBProp = state.tasks[b][state.sort].toLowerCase();

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });

    keysOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    });

    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted,
      tasksFiltered = {};
    if (state.search) {
      Object.keys(tasksSorted).forEach(function(key) {
        let task = tasksSorted[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase();

        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return state.tasks;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      var task = tasksFiltered[key];
      console.log(task);
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      var task = tasksFiltered[key];
      console.log(task);
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
