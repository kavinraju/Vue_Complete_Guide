import { createStore } from 'vuex';

import rootMutations from './mutations.js';
import rootActions from './actions.js';
import rootGetters from './getters.js';

import counterModule from './modules/counter/index.js';

/*
While using modules except state, all others (mutations, actions, getters), are megered 
with the root store. To avoid this we can use namespace.
*/

const store = createStore({
  modules: {
    numbers: counterModule,
  },
  state() {
    // ~data
    return {
      isLoggedIn: false,
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
