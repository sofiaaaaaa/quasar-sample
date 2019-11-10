import Vue from 'vue';
import { uid, Notify } from 'quasar';
import { firebaseDb, firebaseAuth } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';

/* eslint-disable */

const state = {
  tasks: {
    // ID1: {
    //   name: 'aaaaaaa',
    //   completed: true,
    //   dueDate: '2018/06/14',
    //   dueTime: '15:30'
    // },
    // ID2: {
    //   name: 'vvvvvvv',
    //   completed: false,
    //   dueDate: '2010/06/14',
    //   dueTime: '12:30'
    // },
    // ID3: {
    //   name: 'xxxxxxx',
    //   completed: false,
    //   dueDate: '2011/06/14',
    //   dueTime: '12:30'
    // }
  },

  search: '',
  sort: 'dueDate',
  tasksDownloaded: false
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
  clearTasks(state) {
    state.tasks = {};
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
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  }
};

const actions = {
  updateTask({ dispatch }, payload) {
    console.log('updateTask action');
    console.log('payload', payload);
    dispatch('fbUpdateTask', payload);
  },
  deleteTask({ dispatch }, id) {
    dispatch(`fbDeleteTask`, id);
  },
  addTask({ dispatch }, task) {
    let taskId = uid();
    let payload = {
      id: taskId,
      task: task
    };
    dispatch('fbAddTask', payload);
  },
  setSearch({ commit }, value) {
    commit('setSearch', value);
  },
  setSort({ commit }, value) {
    commit('setSort', value);
  },
  fbReadData({ commit }) {
    console.log('start reading data from Firebase');
    let userId = firebaseAuth.currentUser.uid;
    // userId = 'j5Y8NRoV5ZUyIhQspzAvFM81G4h2';
    console.log('userId', userId);

    let userTasks = firebaseDb.ref('tasks/' + userId);
    console.log(userTasks);

    // initial check for data
    userTasks.once(
      'value',
      snapshot => {
        commit('setTasksDownloaded', true);
      },
      error => {
        showErrorMessage(error.message);
        this.$router.replace('/auth');
      }
    );

    // child added
    userTasks.on(
      'child_added',
      snapshot => {
        console.log('snapshot', snapshot);
        let task = snapshot.val();
        let payload = {
          id: snapshot.key,
          task: task
        };
        commit('addTask', payload);
      },
      function(error) {
        console.log(error, 'error');
      }
    );
    // child changed
    userTasks.on(
      'child_changed',
      snapshot => {
        console.log('snapshot', snapshot);
        let task = snapshot.val();
        let payload = {
          id: snapshot.key,
          updates: task
        };
        commit('updateTask', payload);
      },
      function(error) {
        console.log(error, 'error');
      }
    );
    // child removed
    userTasks.on(
      'child_removed',
      snapshot => {
        console.log('snapshot', snapshot);
        let taskId = snapshot.key;
        commit('deleteTask', taskId);
      },
      function(error) {
        console.log(error, 'error');
      }
    );
  },
  fbAddTask({}, payload) {
    console.log('fbAddTask payload', payload);
    let userId = firebaseAuth.currentUser.uid;
    //userId = 'j5Y8NRoV5ZUyIhQspzAvFM81G4h2';

    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id);
    taskRef.set(payload.task, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create('Task added');
      }
    });
  },
  fbUpdateTask({}, payload) {
    console.log('fbAddTask payload', payload);
    let userId = firebaseAuth.currentUser.uid;
    // userId = 'j5Y8NRoV5ZUyIhQspzAvFM81G4h2';
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id);
    taskRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        let keys = Object.keys(payload.updates);
        if (!(keys.includes('completed') && keys.length == 1)) {
          Notify.create('Task updated');
        }
      }
    });
  },
  fbDeleteTask({}, taskId) {
    let userId = firebaseAuth.currentUser.uid;
    // userId = 'j5Y8NRoV5ZUyIhQspzAvFM81G4h2';
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId);
    taskRef.remove(error => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create('Task Deleted.');
      }
    });
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
