const app = Vue.createApp({
  data() {
    // by returning this object, these gets stored in the global context of this vue app object
    // hence it can accessed using this keyword
    return {
      courseGoalA: "Finish the course and learn Vue",
      courseGoalB: "Master Vue and build amazing apps.",
      vueLink: "https://vuejs.org",
    };
  },

  methods: {
    outputGoal: function () {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return this.courseGoalA;
      } else {
        return this.courseGoalB;
      }
    },
  },
});

app.mount("#user-goal");
