<template>
  <section>
    <button @click="onPressedBackButton">Back</button>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>

    <router-link to="/teams/t2">Move to t2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  inject: ['users', 'teams'],
  props: ['teamId'],

  methods: {
    onPressedBackButton() {
      this.$router.back();
    },

    // loadTeamMembers(route) {
    loadTeamMembers(teamId) {
      //  const teamId = route.params.teamId;
      const selectedTeam = this.teams.find((team) => team.id == teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }

      this.teamName = selectedTeam.name;
      this.members = selectedMembers;
    },
  },

  created() {
    // code in created() method doesn't run when just url changes/updates
    // this is the working of Vue, to cache the component, instead of destroying and recreating
    // when url changes $route object would change
    //this.loadTeamMembers(this.$route);
    this.loadTeamMembers(this.teamId);

    // query parameter are provided througj $route and not as prop
    console.log(this.$route.query);
  },

  /*
  View router will call the method beforeRouteUpdate(), only when we use Routing,
  when the component is being resued. That is data gets updated on the UI component.

  // using beforeRouteUpdate would be an alternate to use watcher on teamId
  */
  beforeRouteUpdate(to, from, next) {
    console.log('Team members component beforeRouteUpdate');
    console.log(to, from);
    //this.loadTeamMembers(to.params.teamId);
    next();
  },
  watch: {
    // $route(newRoute) {
    //   this.loadTeamMembers(newRoute);
    // },
    teamId(newId) {
      this.loadTeamMembers(newId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #11005c;
}

button:hover,
button:active {
  background-color: #220a8d;
}
</style>