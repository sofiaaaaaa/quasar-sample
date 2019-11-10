/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './store-tasks';
import settings from './store-settings';
import auth from './store-auth';
Vue.use(Vuex);

export default function() {
  /* eslint-disable */

  const Store = new Vuex.Store({
    modules: {
      tasks,
      settings,
      auth
    },
    strict: process.env.DEV
  });

  return Store;
}
