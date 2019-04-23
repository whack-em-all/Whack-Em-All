<template>
  <div id="app">
    <input type="text" v-model="username">
    <button @click="register">Eltim Sombong</button>
    <br>
    <input type="text" v-model="roomName">
    <button @click="registerRoom">Create Room</button>
    <div class="row">
      <div class="col-sm-6" v-for="(room, index) in rooms" :key="index">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ room.name }}</h5>
            <p>{{ room.players.length }}/5</p>
            <button class="btn btn-primary" @click="join(room.id)">JOIN</button>
            <button class="btn btn-primary" @click="exit(room.id)">EXIT</button>
          </div>
        </div>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      roomName: ""
    };
  },
  computed: {
    ...mapState(["rooms"])
  },
  methods: {
    register() {
      this.$store.commit("register", this.username);
      this.$store.dispatch("getAllRoom");
    },
    registerRoom() {
      localStorage.setItem('room', this.username)
      this.$store.dispatch("createRoom", this.roomName);
    },
    join(roomId) {
      this.$store.dispatch("joinRoom", roomId)
    },
    done(result) {
      let playersInfo = []
      let room = this.rooms.find(room => room.name === localStorage.getItem('room'))
      playersInfo = room.players
      playersInfo.forEach((e, index) => {
        playersInfo[index][score] = result
      });
      this.$store.dispatch("setWinner", { players: [], winner: result.winner})
    }
  }
};
</script>


<style>
</style>
