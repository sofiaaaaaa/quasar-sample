import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './store-tasks'
Vue.use(Vuex)

export default function () {
  /* eslint-disable */

  const Store = new Vuex.Store({
    modules: {
      tasks
    },
    strict: process.env.DEV
  })

  return Store

}
