<template>
  <div id="app">
    <!-- <div class="container">
      <add-new @newtask="addtasks"></add-new>
    </div> -->
    <section>
      <add-new @newtask="addtasks"></add-new>
    </section>
    <main class="flexbox">
      <the-board id="board-1">
        <div class="contain">
          <h3>Request</h3>
        </div>
        <br />
        <the-card
          v-for="tasks in reqtask"
          :key="tasks.id"
          :id="tasks.id"
          :task="tasks.task"
          draggable="true"
          @delete="deleting"
        ></the-card>
        <!-- <the-card id="card1" draggable="true">
        <p>card one</p>
      </the-card> -->
      </the-board>
      <the-board id="board-2">
        <h3>In Progress</h3>
        <br />
        <the-card
          v-for="tasks in progtask"
          :key="tasks.id"
          :id="tasks.id"
          :task="tasks.task"
          draggable="true"
          @delete="deleting"
        ></the-card>
        <!-- <button>Add</button> -->

        <!-- <the-card id="card2" draggable="true">
        <p>card two</p>
      </the-card> -->
      </the-board>
      <the-board id="board-3">
        <h3>Done</h3>
        <br />
        <the-card
          v-for="tasks in fintask"
          :key="tasks.id"
          :id="tasks.id"
          :task="tasks.task"
          draggable="true"
          @delete="deleting"
        ></the-card>
        <!-- <the-card id="card3" draggable="true">
        <p>card three</p>
      </the-card> -->
      </the-board>
    </main>
  </div>
</template>

<script>
import TheBoard from "./components/TheBoard.vue";
import TheCard from "./components/TheCard.vue";
import AddNew from "./components/AddNew.vue";
import { db } from "../db";
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
export default {
  data() {
    return {
      db,
      reqtask: useObservable(liveQuery(() => db.reqtask.toArray())),
      progtask: useObservable(liveQuery(() => db.progtask.toArray())),
      fintask: useObservable(liveQuery(() => db.fintask.toArray())),
    };
  },
  components: { TheBoard, TheCard, AddNew },
  name: "app",
  methods: {
    async addtasks(addtask) {
      const thenewtask = {
        id: "card" + new Date().toISOString(),
        task: addtask.thetask,
      };

      if (addtask.option === "req") {
        this.reqtask.push(thenewtask);
        await db.reqtask.add({
          id: "card" + new Date().toISOString(),
          task: addtask.thetask,
        });
      } else if (addtask.option === "ipg") {
        this.progtask.push(thenewtask);
        await db.progtask.add({
          id: "card" + new Date().toISOString(),
          task: addtask.thetask,
        });
      } else if (addtask.option === "done") {
        this.fintask.push(thenewtask);
        await db.fintask.add({
          id: "card" + new Date().toISOString(),
          task: addtask.thetask,
        });
      }
    },
    async deleting(thetask) {
      await db.reqtask.delete(thetask);
      await db.progtask.delete(thetask);
      await db.fintask.delete(thetask);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #121212;
}

.flexbox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;
  max-height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  padding: 35px;
}

h3 {
  font-family: roboto;
  color: white;
  text-align: center;
}

.container {
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: rgb(44, 44, 44);
  color: white;
  justify-content: center;
  /* text-align: justify; */
  align-items: center;
  width: 20%;
  max-width: 40rem;
}

.contain {
  /* display: flex; */
  justify-content: center;
}
</style>
