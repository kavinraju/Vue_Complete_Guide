<template>
  <div>
    <button @click="inc">Add 2</button>
    <button @click="increase({ value: 11 })">Add 11</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    // addOne() {
    //   //this.$store.state.counter += 2; // this calls the state directly
    //   // this.$store.commit('increment'); // this is calling the mutation object directly
    //   this.$store.dispatch('increment'); // this calls the action object
    // },

    //...mapActions(['increment', 'increase']),
    ...mapActions('numbers', {
      inc: 'increment',
      increase: 'increase',
    }),
  },
};
</script>