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
                  :style="{ 'background-image': value ? 'url(' + image1 + ')' : 'url(' + image2 + ')'}"
                >
                  <transition name="slide-up">
                    <img :src="image" v-if="value">
                  </transition>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="col col-lg-3">
        <div class="score-board">
          <h1 class="timer">00:{{ displayTime }}</h1>
          <div class>
            <h2>Score Board</h2>
            <div v-for="i in 4" :key="i">
              <p>Player1: {{ point }}</p>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :style="{width: persen}"
                ></div>
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sound from "@/assets/click-sound.mp3";
import db from "@/api/firebaseAPI.js";

export default {
  name: 'game',
  data() {
    return {
      mole_grid: [[0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      has_won: false,
      point: 0,
      finish: false,
      image1: [
        'https://storage.googleapis.com/miniwp17/yoki-done.png',
        'https://storage.googleapis.com/miniwp17/semi-done.png',
        'https://storage.googleapis.com/miniwp17/rama-done.png',
        'https://storage.googleapis.com/miniwp17/icha-done.png',
        'https://storage.googleapis.com/miniwp17/dim-done.png',
        'https://storage.googleapis.com/miniwp17/armedi-done.png',
      ],
      image2:
        "https://www.evershine.com/wp-content/uploads/2017/11/60T90-Black.jpg",
      image: "",
      persen: "",
      time: 60,
      audio: new Audio(
        "https://storage.googleapis.com/miniwp17/click-sound-%5BAudioTrimmer.com%5D%20(1).mp3"
      ),
      displayTime: 60
    };
  },
  mounted() {
    this.init();
    this.timer();
    return db
      .collection("game")
      .doc("image")
      .onSnapshot(snapshot => {
        this.image = snapshot.data().image;
      });
  },
  watch: {
    point: function(val) {
      this.persen = (val / 40) * 100 + "%";
    }
  },
  methods: {
    randomImage() {
      let data = {
        image: this.image1[Math.floor(Math.random() * 6)]
      };
      db.collection("game")
        .doc("image")
        .set(data)
        .then(created => {
          // console.log("halo");
        });
    },
    timer() {
      setTimeout(() => {
        this.$router.push("/result");
      }, 60000);
    },
    init() {
      setInterval(() => {
        this.time -= 1;
        if (this.time.toString().length === 1) {
          this.displayTime = "0" + this.time;
        } else {
          this.displayTime = this.time;
        }
      }, 1000);

      const first = this.mole_grid.length;
      const second = this.mole_grid[0].length;

      setInterval(() => {
        this.randomImage();

        this.set_mole(
          this.getRandomInt(0, first),
          this.getRandomInt(0, second),
          1,
        );
      }, 500);
      setInterval(() => {
        this.set_mole(
          this.getRandomInt(0, first),
          this.getRandomInt(0, second),
          0,
        );
      }, 100);
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
        this.audio.play();
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
      let sum = 0;
      for (const i in this.mole_grid) {
        for (const j in this.mole_grid[i]) {
          sum += parseInt(this.mole_grid[i][j]);
        }
      }
      if (sum === 0) {
        this.has_won = true;
      }
      return this.has_won;
    },
  },
};
</script>

<style scoped>
@import url("https://rsms.me/inter/inter.css");

.title-hr {
  font-weight: 700;
}

img {
  width: 100%;
  height: 100%;
}
p {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 1.4rem;
}

h1 {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 9rem;
}

.timer {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 9rem;
}

h2 {
  font-family: "Inter", sans-serif;
  font-weight: 500;
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
  /* border-radius: 10%; */
  width: 11rem;
  height: 14rem;
  margin: 0.3rem;

  overflow: hidden;

  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: 100%;
  background-repeat: no-repeat;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.2s ease;
}
.slide-up-leave-active {
  /* transition: all 0.2s ease; */

  /* transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1); */
}
.slide-up-enter,
.slide-fade-leave-to {
  transform: translateY(100vh);
  opacity: 0;
}

.progress {
  height: 2rem;
}

.bighr {
  background-color: black !important;
  color: black !important;
  border: solid 1px black !important;
  height: 1px !important;
}

.border-custom {
  border: 1px black solid;
}
</style>
