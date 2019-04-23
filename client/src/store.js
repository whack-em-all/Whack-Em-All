import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/api/firebaseAPI';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    currentRoomId: '',
    currentPlayer: '',
    myRoom: {},
  },
  mutations: {
    register(state, playerName) {
      state.currentPlayer = playerName;
    },
    getRooms(state, data) {
      state.rooms = data;
      if(localStorage.getItem('idRoom')){
        let room = state.rooms.find(room => room.id === localStorage.getItem('idRoom'))
        state.myRoom = room
      }
    },
  },
  actions: {
    createRoom({ commit, state, dispatch }, roomName) {
      db.collection('rooms')
        .add({
          name: roomName,
          players: [{ name: localStorage.getItem('username'), score: 0 }],
          winner: '',
          createdAt: new Date(),
        })
        .then(( docs ) => {
          console.log(docs);
          
          localStorage.setItem('idRoom', docs._key.path.segments[1]);
          router.push(`/game/${docs._key.path.segments[1]}`)
          dispatch('getAllRoom');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllRoom({ commit }) {
      db.collection('rooms')
        .orderBy('createdAt')
        .onSnapshot((docs) => {
          const data = [];
          docs.forEach((e) => {
            const info = e.data();
            info.id = e.id;
            data.push(info);
          });
          commit('getRooms', data);
        }, (err) => {
          console.log(err);
        });
    },
    joinRoom({ commit, state, dispatch }, roomId) {
      let newPlayers = [];
      const room = state.rooms.find(room => room.id === roomId);
      newPlayers = room.players;
      newPlayers.push({ name: state.currentPlayer, score: 0 });
      db.collection('rooms')
        .doc(roomId)
        .update({
          players: newPlayers,
        })
        .then(() => {
          dispatch('getAllRoom');
          router.push(`/game/${roomId}`)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setWinner({ commit, state, dispatch }, result) {
      const Players = [];
      Players.push(result.players);
      db.collection('rooms')
        .where('name', '==', localStorage.getItem('room'))
        .update({
          players: Players,
          winner: result.winner,
        })
        .then(() => {
          dispatch('getAllRoom');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
