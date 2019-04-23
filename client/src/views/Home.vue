<template>
  <div class="center text-center">
    <h1 data-heading="Click Em All">
		<span contenteditable data-heading="Click Em All">Click Em All</span>
	</h1>
    <form class="form-signin" @submit.prevent="register">
      <label class="sr-only"></label>
      <input type="text" class="form-control" v-model="username" required>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      username: '',
    };
  },
  created() {
    console.log('halooooo');
  },
  methods: {
    register() {
      console.log('masuk');
      localStorage.setItem('username', this.username);
      this.$store.commit('register', this.username);
      this.$store.dispatch('getAllRoom');
      this.$router.push('/lobby');
    },
  },
};
</script>

<style>

h1 {
  font-family: 'Rig Bold Face', sans-serif;
  text-transform: uppercase;
  font-size: 10vw;
  text-align: center;
  font-weight: normal;
  margin: 0;
  top: 25%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  position: relative;
  color: #91d4ff;
}
h1:before, h1:after,
h1 span:before,
h1 span:after {
  content: attr(data-heading);
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 5;
  font-weight: normal;
  text-shadow: none;
}
h1:before {
  color: #fff;
  font-family: 'Rig Bold Inline', sans-serif;
}
h1:after {
  font-family: 'Rig Bold Coarse', sans-serif;
  color: #040351;
}

span::before {
  font-family: 'Rig Bold Shadow', sans-serif;
  color: #cbc7e3;
  z-index: -1;
}
span::after {
  font-family: 'Rig Bold Extrude', sans-serif;
  color: #4d8bea;
  z-index: -1;
}

p {
  color: #747474;
}

@font-face {
  font-family: 'Rig Bold Coarse';
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/Rig-BoldCoarse.otf");
}
@font-face {
  font-family: 'Rig Bold Extrude';
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/Rig-BoldExtrude.otf");
}
@font-face {
  font-family: 'Rig Bold Shadow';
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/Rig-BoldShadow.otf");
}
@font-face {
  font-family: 'Rig Bold Face';
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/Rig-BoldFace.otf");
}
@font-face {
  font-family: 'Rig Bold Inline';
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/Rig-BoldInline.otf");
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.center {
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  width: 40%;
  height: 50%;
}

input {

  background-color: transparent;
  /* outline: none; */
}

input[type="text"] {

  border: none;
  border-radius: 5px;
  border-bottom: 2px solid rgb(187, 184, 184);
  background-color: transparent;
}

.form-control:focus {
  color: black;
  border-color: black;
  -webkit-box-shadow: none;
  box-shadow: none;
  background-color: transparent;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
