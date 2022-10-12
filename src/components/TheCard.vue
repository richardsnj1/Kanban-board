<template>
  <div
    class="card"
    :id="id"
    @dragstart="dragStart"
    @dragover.stop
    @dragend="displaying"
  >
    <slot>
      <div>
        <P>{{ task }}</P>
        <button @click="deletetask">X</button>
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  props: ["task", "id"],
  // beforeCreate(){
  //   console.log(this.task);
  // },
  emits: ["delete"],
  methods: {
    dragStart(event) {
      // console.log(event);
      const target = event.target;
      // event.dataTransfer.setData("thetask", target.task);
      event.dataTransfer.setData("cardid", target.id);
      event.dataTransfer.setData("thetask", this.task);
      // console.log(target.draggable);
      // console.log(target.id);
      // console.log(event.target);
      setTimeout(() => {
        target.style.display = "none";
      }, 0);
    },
    displaying(event) {
      const target = event.target;
      target.style.display = "block";
    },
    deletetask() {
      this.$emit("delete", this.id);
    },
  }
};
</script>

<style scoped>
div {
  display: grid;
  grid-template-columns: auto 0;
}

button {
  color: rgb(239, 103, 103);
  background-color: transparent;
  border: none;
  cursor: pointer;
}

button:hover {
  color: white;
}

.card {
  padding: 15px 25px;
  background-color: #8641da;
  color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 15px;
  /* border: 1px solid white; */
}
</style>
