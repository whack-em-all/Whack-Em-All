<template>
  <div>
    <div class="container">
        <h1 class="display-4" id="title" data-heading="Click Em All">
        <span data-heading="Click Em All">Click Em All</span>
        </h1>
        <p class="text-center">Create or join room to get started.</p>

      <!-- Button trigger modal -->
      <div class="text-center">

      <button
        type="button"
        class="btn green ml-2"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >Create new room</button>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Create New Room</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Room Name:</label>
                  <input type="text" class="form-control" v-model="roomName">
                </div>
              </form>
            </div>
              <button type="button" class="btn button purple" data-dismiss="modal">Close</button>
              <button type="button" class="btn button green" @click="registerRoom">Create</button>
          </div>
        </div>
      </div>

      <div class="mt-5 row justify-content-between">
        <div class="col-lg-3 mx-2 mb-3" v-for="(room, index) in rooms" :key="index">
          <div class="card text-center shadow-sm bg-white rounded" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{ room.name }}</h5>
              <h4 class="card-text">{{ room.players.length}}/5</h4>
              <a href="#" class="btn yellow mt-2 disabled" v-if="room.players.length === 5">Full</a>
              <a href="#" class="btn blue mt-2" v-else>Join</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Lobby',
  data() {
    return {
      roomName: '',
    };
  },
  created() {
      this.$store.dispatch('getAllRoom');
  },
  computed: {
    ...mapState(['rooms']),
  },
  methods: {
    registerRoom() {
      localStorage.setItem('room', this.roomName);
      this.$store.dispatch('createRoom', this.roomName);
    },
    join(roomId) {
      this.$store.dispatch('joinRoom', roomId);
    },
    done(result) {
      let playersInfo = [];
      const room = this.rooms.find(room => room.name === localStorage.getItem('room'));
      playersInfo = room.players;
      playersInfo.forEach((e, index) => {
        playersInfo[index][score] = result;
      });
      this.$store.dispatch('setWinner', { players: [], winner: result.winner });
    },
  },
};
</script>

<style>
#title {
  margin-top: 7rem;
}

.room:hover {
  cursor: pointer;
}

.btn {
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}


/* button div */
#buttons {
  padding-top: 50px;
  text-align: center;
}

/* start da css for da buttons */
.btn {
  border-radius: 5px;
  padding: 15px 25px;
  font-size: 1rem;
  text-decoration: none;
  margin: 20px;
  color: #fff;
  position: relative;
  display: inline-block;
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 1px 0px 0px;
}

.blue {
  background-color: #55acee;
  box-shadow: 0px 5px 0px 0px #3C93D5;
}

.blue:hover {
  background-color: #6FC6FF;
}

.green {
  background-color: #2ecc71;
  box-shadow: 0px 5px 0px 0px #15B358;
}

.green:hover {
  background-color: #48E68B;
}

.red {
  background-color: #e74c3c;
  box-shadow: 0px 5px 0px 0px #CE3323;
}

.red:hover {
  background-color: #FF6656;
}

.purple {
  background-color: #9b59b6;
  box-shadow: 0px 5px 0px 0px #82409D;
}

.purple:hover {
  background-color: #B573D0;
}

.orange {
  background-color: #e67e22;
  box-shadow: 0px 5px 0px 0px #CD6509;
}

.orange:hover {
  background-color: #FF983C;
}

.yellow {
  background-color: #f1c40f;
  box-shadow: 0px 5px 0px 0px #D8AB00;
}

.yellow:hover {
  background-color: #FFDE29;
}

</style>
