const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      lastName: "",
      //fullname: "",
    };
  },
  /*
  watcher best suit, if we wanna run some code which may be, but not necessarily, 
  also updates the data property, in reation to a property change.

  compute best suits, if we want to calculate some o/p value dynamically.
  */
  watch: {
    counter(value) {
      if (value > 50) {
        const that = this;
        setTimeout(function () {
          that.counter = 0;
          console.log("TIMEOUT!");
        }, 2000);
      }
    },
    // name(value) {
    //   if (value === "") {
    //     this.fullname = "";
    //   } else {
    //     this.fullname = value + " " + this.lastName;
    //   }
    // },
    // lastName(value) {
    //   if (value === "") {
    //     this.fullname = "";
    //   } else {
    //     this.fullname = this.name + " " + value;
    //   }
    // },
  },
  computed: {
    fullname() {
      console.log("Running again...");
      if (this.name == "" && this.lastName === "") {
        return "";
      }
      return this.name + " " + this.lastName;
    },
  },
  methods: {
    outputFullname() {
      console.log("Running again...");
      if (this.name == "") {
        return "";
      }
      return this.name + " " + "Lastname";
    },
    resetInput() {
      this.name = "";
    },
    setName(event) {
      this.name = event.target.value;
    },
    add(num) {
      this.counter = this.counter + num;
    },
    reduce(num) {
      this.counter = this.counter - num;
      // this.counter--;
    },
  },
});

app.mount("#events");
