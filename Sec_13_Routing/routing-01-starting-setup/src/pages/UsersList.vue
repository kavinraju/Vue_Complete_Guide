<template>
  <div>
    <button @click="confirmInput">Programatic Navigation</button>
    <button @click="saveChanges">Save Changes</button>
    <ul>
      <user-item
        v-for="user in users"
        :key="user.id"
        :name="user.fullName"
        :role="user.role"
      ></user-item>
    </ul>
  </div>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changesSaved: false,
    };
  },
  methods: {
    confirmInput() {
      // do something
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changesSaved = true;
    },
  },

  // executed before the navigation to this component is confirmed
  // component level
  beforeRouteEnter(to, from, next) {
    console.log('UsersList Component beforeRouteEnter');
    console.log(to, from);
    next(); //need to provide this as this function executes before route gets confirmed
  },

  beforeRouteLeave(to, from, next) {
    console.log('UsersList Component beforeRouteLeave');
    console.log(to, from);
    if (this.changesSaved) {
      next();
    } else {
      const userWantsToLeave = confirm(
        ' Are you sure? You got unsaved changes!'
      );
      next(userWantsToLeave);
    }
  },
  unmounted() {
    console.log('unmointed');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>