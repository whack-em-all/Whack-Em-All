<template>
  <div>
    <div id="container">
      <div id="row">
        <h1>THE RESULT</h1>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h3>Player 1</h3>
          </li>
          <li class="list-group-item">
            <h4>Player 2</h4>
          </li>
          <li class="list-group-item">
            <h5>Player 3</h5>
          </li>
          <li class="list-group-item">
            <h6>Player 4</h6>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h1{
  text-align: center;
  margin-bottom: 20px;
}
#row {
  margin: 20px auto;
  display: flex;
  flex-direction: column; 
    width: 40%;
}
.list-group-item {
  text-align: center;
  border-bottom: 1px;
}
</style>
