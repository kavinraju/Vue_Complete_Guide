import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    //{ path: '/teams', component: TeamsList, alias='/' },
    // with alias url doesn't change
    {
      name: 'teams',
      path: '/teams',
      meta: {
        needsAuth: true,
      },
      //component: TeamsList,
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        // props: true says that this route should also work when :teamId is sent as props
        {
          name: 'team-members',
          path: '/teams/:teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      //component: UsersList
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      // route level
      beforeEnter(to, from, next) {
        console.log('Users beforeEnter');
        console.log(to, from);
        next();
      },
    },
    //  { path: '/teams/new', component:  },

    { path: '/:notFound(.*)', component: NotFound },
  ],
  //linkActiveClass: 'active',
  //scrollBehavior(to, from, savedPosition) {
  scrollBehavior(_, _2, savedPosition) {
    //console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  // diff ways of calling next();
  //next();
  //next(false);
  //next('/users');
  // next({name: 'team-members', params: {teamId: 't2'}});
  /*if (to.name === 'team-members') {
      next();
    } else {
      next({ name: 'team-members', params: { teamId: 't2' } });
    }*/

  if (to.meta.needsAuth) {
    console.log('Needs Auth');
    next();
  } else {
    next();
  }

  next();
});

router.afterEach(function (to, from) {
  // ex. sending analytics data
  // we won't control the UI
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;
