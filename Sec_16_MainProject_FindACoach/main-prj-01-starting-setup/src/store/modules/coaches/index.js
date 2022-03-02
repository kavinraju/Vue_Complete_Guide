import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzuller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximillian and I have worked as a freelance web developer for years.",
          hourlyRate: 30,
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Hulie and work as a senior developer in big tech company. I can help you with.',
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
