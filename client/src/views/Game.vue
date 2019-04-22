<template>
  <div class="container max-width">
    <h2 v-if="finish">YOU WIN!!!</h2>
    <div class="row">
      <div class="col col-lg-9 float-right">
        <div class="container board mx-auto">
          <h2 class="title">this is title</h2>
          <table class="middle" v-if="finish === false">
            <tr v-for="(array, x_coord) in mole_grid" :key="x_coord">
              <td v-for="(value, y_coord) in array" :key="y_coord">
                <div
                  class="circle"
                  @click.prevent="squash(x_coord, y_coord, value)"
                  :style="{ background: value ? 'orange' : 'black'}"
                ></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="col col-lg-3">
        <div class="container score-board">
          <h2>Score Board</h2>
          <hr>
          <p>Player1: {{ point }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "game",
  data() {
    return {
      mole_grid: [[0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      has_won: false,
      point: 0,
      finish: false
    };
  },
  mounted() {
    this.init();
  },
  computed: {},
  methods: {
    init() {
      let first = this.mole_grid.length;
      let second = this.mole_grid[0].length;
      this.getRandomInt();
      setInterval(() => {
        this.set_mole(
          this.getRandomInt(0, first),
          this.getRandomInt(0, second),
          1
        );
      }, 500);
      setInterval(() => {
        this.set_mole(
          this.getRandomInt(0, first),
          this.getRandomInt(0, second),
          0
        );
      }, 70);
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    set_mole(x_coord, y_coord, value) {
      this.mole_grid[x_coord][y_coord] = value;
      this.$set(this.mole_grid, x_coord, this.mole_grid[x_coord]);
    },
    squash(x_coord, y_coord, value) {
      this.set_mole(x_coord, y_coord, 0);
      // console.log(value);
      if (value === 1) {
        this.addPoint();
      }
    },
    addPoint() {
      this.point += 1;
    },
    won() {
      if (this.has_won) {
        return true;
      }
      var sum = 0;
      for (var i in this.mole_grid) {
        for (var j in this.mole_grid[i]) {
          sum += parseInt(this.mole_grid[i][j]);
        }
      }
      if (sum == 0) {
        this.has_won = true;
      }
      return this.has_won;
    }
  }
};
</script>

<style scoped>
@import url("https://rsms.me/inter/inter.css");

p {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 3rem;
}

.max-width {
  max-width: 90rem;
}

.title {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.board {
  border: black 1px solid;
  min-height: 100vh;
  max-width: 50rem;
  text-align: center;
}

.score-board {
  margin-top: 3rem;
}

.middle {
  margin: 0 auto;
}

.circle {
  border-radius: 10%;
  width: 11rem;
  height: 14rem;
  margin: 0.3rem;
}
</style>
