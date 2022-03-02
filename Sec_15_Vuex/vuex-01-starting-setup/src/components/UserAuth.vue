<template>
  <div>
    <button @click="login" v-if="!isAuth">Login</button>
    <button @click="logout" v-else>Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    //...mapState(['isLoggedIn']),
    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    },
  },
  methods: {
    ...mapActions(['logout']),
    login() {
      this.$store.dispatch('login');
    },
    //logout() {},
  },
};
</script>