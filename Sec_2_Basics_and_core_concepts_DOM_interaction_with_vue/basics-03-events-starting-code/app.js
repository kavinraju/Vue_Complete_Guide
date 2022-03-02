const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      name: "",
      confirmedName: "",
    };
  },

  methods: {
    confirmName() {
      this.confirmedName = this.name;
    },
    submitForm(event) {
      // event.preventDefault(); // can also be added in the html code using the event modifiers (.prevent)
      alert("Submitted!");
    },
    setName(event, lastname) {
      this.name = event.target.value + " " + lastname;
    },

    add(num) {
      this.counter += num;
    },
    reduce(num) {
      this.counter -= num;
    },
  },
});

app.mount("#events");
