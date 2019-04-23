<template>
  <div id="form">
    <input class="form-control form-control-lg" type="text" placeholder="Your Name"
    v-model="name" id="name" name="name" autofocus>
    <button type="submit" class="btn btn-primary" @click="add">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  methods: {
    add() {
      this.$router.push('/lobby');
    },
  },
};
</script>

<style>
#form {
  width: 40%;
  margin: 250px auto auto auto;
  display: flex;
}
</style>
