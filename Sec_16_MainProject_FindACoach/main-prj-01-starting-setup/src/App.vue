<template>
  <div>
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
  created() {
    console.log('Created lifecycle hook function.');
    this.$store.dispatch('tryLogin');
  },
  computed: {
    didAutoLogout() {
      console.log(
        'computed didAutoLogout:' + this.$store.getters.didAutoLogout
      );

      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      console.log('watcher didAutoLogout:');
      console.log('curValue: ' + curValue);
      console.log('oldValue: ' + oldValue);

      if (curValue && curValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    },
  },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>