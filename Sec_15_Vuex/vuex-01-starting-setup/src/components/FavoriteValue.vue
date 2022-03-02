<template>
  <div>
    <!-- <h3>{{ counter }}</h3> -->
    <h3>{{ counter }}</h3>
    <p>We do more...</p>
  </div>
</template>

<script>
import {} from 'vuex';

export default {
  computed: {
    counter() {
      return this.$store.getters['numbers/normalizedCounter'];
    },
    // ...mapGetters(['normalizedCounter']),
  },
};
</script>