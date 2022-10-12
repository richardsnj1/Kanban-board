<template>
  <form @submit.prevent="Submitting">
    <div>
      <label>Task : </label>
      <input class="input" type="text" v-model="things.thetask" />
    </div>
    <div>
      <label for="option">Please pick which board you want to add</label>
      <select id="option" name="option" v-model="things.option">
        <option value="req">Request</option>
        <option value="ipg">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
    <div>
      <button class="button">Add Task</button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["newtask"],
  data() {
    return {
      things: {
        thetask: "",
        option: "req",
      },
    };
  },
  methods: {
    Submitting() {
      if (!this.things.thetask) {
        alert("Please enter a value");
      } else {
        this.$emit("newtask", this.things);
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: rgb(44, 44, 44);
  color: white;
  justify-content: center;
  /* text-align: justify; */
  align-items: center;
  width: 30%;
  max-width: 40rem;
  overflow: hidden;
}

.input {
  display: flex;
  width: 100%;
  height: 1.5rem;
  font: inherit;
  padding: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select{
  display: flex;
  width: 100%;
  height: 1.5rem;
  font: inherit;
  /* padding: 0.2rem; */
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:focus{
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}
button {
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  max-width: 300px;
  background-color: #08b6a4;
  padding: 5px;
  border-radius: 15px;
  box-shadow: black;
  border: none;
  /* margin-left: 20px; */
  justify-content: center;
  margin: auto;
  margin-top: 15px;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  font-size: 15px;
}
</style>
