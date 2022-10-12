<template>
  <div
    :id="id"
    class="board"
    @dragover.prevent
    @dragenter.prevent
    @drop.prevent="drop"
  >
    <slot></slot>
    <!-- <p>{{ thetask }}</p> -->
  </div>
</template>

<script>
// import AddNew from './AddNew.vue';
import { db } from "../../db";

export default {
  // components: { AddNew },
  props: ["id"],
  // inject: ["thetask"],
  methods: {
    drop(event) {
      const cardid = event.dataTransfer.getData("cardid");
      const thetask = event.dataTransfer.getData("thetask");
      // console.log(thetask);
      // const thetask = event.dataTransfer.getData("thetask");
      const card = document.getElementById(cardid);
      card.style.display = "block";
      // console.log(thetask);
      event.target.appendChild(card);
      this.updateCard(event.target.id, cardid, thetask);
    },
    async updateCard(bid, cid, ctask) {
      if (bid === "board-1") {
        console.log(cid);
        console.log(ctask);
        await db.reqtask.add({id: cid, task: ctask});
        await db.progtask.delete(cid);
        await db.fintask.delete(cid);
        console.log(db.reqtask)
      }
      else if (bid === "board-2") {
        console.log(cid);
        console.log(ctask);
        await db.progtask.add({id: cid, task: ctask});
        await db.reqtask.delete(cid);
        await db.fintask.delete(cid);
      }
      else if (bid === "board-3") {
        console.log(cid);
        console.log(ctask);
        await db.fintask.add({id: cid, task: ctask});
        await db.reqtask.delete(cid);
        await db.progtask.delete(cid);
      }
    },
  },
};
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  /* background-color: #ce5c5c; */
  background-color: rgb(44, 44, 44);
  padding: 15px;
  /* border-radius: 15px; */
  border: 1px solid black;
  margin-left: 20px;
  overflow: hidden;
}
</style>
