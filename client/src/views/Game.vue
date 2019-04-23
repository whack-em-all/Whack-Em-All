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
                  <img :src="image" v-if="value">
                </div>
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
      finish: false,
      image1: ["https://00e9e64bac96147975f4593acca84c1bb4c228ac739584c776-apidata.googleusercontent.com/download/storage/v1/b/miniwp17/o/armedi-done.png?qk=AD5uMEvrr5et-IaBXfCoKr_r8kDGTnNkxolRjruC3orvIAo3mIhhDfSW50LJzEQAfpuH8NPgD8h7vYRf5SuwyH_4nzIIBBJEi-jBcI4gD0yeRZijFsd-XA6Ff9OsJHq5BKhqb73hl581UMPY6dGVc6P8H_EapXluk6ZsfzARe77HsO18RFayY7xPQosWnF56WeJ5Pa7OVtW-fOBr4ELjbWJy1R8Qc1vCkkz34c-dLgmKHSiWFwnKcvywPchDcPgmcNrVZ6NmkQXyVHxyaO-9MN_B3V7HPXpXSGc6KHh3KNwB-HbHP6ZUx0lQYP6hSi7K5yDmlcbyo_S2SFN2VW2knTNzaFR5LjMnTYsprmK5MYKvM9ycRm4ygxnHLaOKqQr_f7uEX9STgMuBwdr51xEtDq8vA-5FV4tH9wqiAT54XTFmlcwN0saPmsgdtfoDKG3X5Cs5YK2ZYYTObxp6hrKOmgt7rfdOf1aQYwTHm7j2oIs2wbfD1XVDebO9_i0e1Cc17rqXVW-8GYbfRgQbqpG_SiMsbzHXXKLXN56Dw2d8YThrISVDHHss1ysscUhrMTWGyquX2mik0jHFVcGFrW444lgx6oYLZL4ogH4tXWBGnirDufauKE3hSMAUTLbj0zvMU_oBlt1LMZgWsJ9O3Q8css1ISuCTMfhAHlVQ_7Zfzi9p32heiArE8uS0arG3eTDxqrdAESjHFAW8nzCp5dP3WbRxlTMBeL6g-jhD3p--A98gfGAwPTvyX71INUb-rcU2xzLYVbF9j_jR","https://00e9e64bac28e596ee716ede6f45790b5301ac219c69bff901-apidata.googleusercontent.com/download/storage/v1/b/miniwp17/o/dim-done.png?qk=AD5uMEvcORU4x_zNElAuHsgErV1qC3w43EUXqrK4oOkXV77B6Gr8NxejSOn_hYZ_cDuUFI9CLjd5HskgO7v190AnIEcD7-ExBIwTRcMXe9hJyaCcI3CaATz4CLZXdw-Vc8skRf54Yieb6wLWwnlEc83GaxJy1WDPuZgLUOA1KfatvQ7_9BFDrTCSnfZ9yVL3XygEr8Ul1T_qC9fQKVNNPJhk6G3OeC0xRhMbvaa2b2J9ax9eFSVMLF2dw1ylaLr0Zi4R9auItEWgZYPdWrkgitJkbsp2EEQEGYJ6rk-8VGQrHd3BDxKceCT5cB7N-8z5xJ-cAlNUpUknLe4Z_x9OvsHfps3iGqD1QwDbS8oWzXCAYzHHZiFgL8QymNnFkcw5yryhoBIer4HNlV6ZLIs90b6BEumbgqNEPeuvv0pDOidnzAp1tBLzF0CwMUV9-2-65S9yTDsmhzrZSTW4IXCiq2Dg7zZzR19vKMK01x2-aYGdGjUqElSv92Vtn3qtzJi15ZoLD7rPxigKBwXWkeVRS2Lcvhem1j5MWRscrmEkU59b8hinHOCMRkS4WV_WK1e12v29QJohl45CDoQVH899faSrMacEiENTPMgPiw06TlqX5IxW1rxDjMYc0ZP48qc2D0gS2O-0XK5T9MEfE4mt4V4KLkg8ma2pM1QoSKlZ5oL3Rs-XyNk2JvMxuzInOl5tkAtjcdgb-WyHQRSF94agPx_HucAHUZiDNtOAFWRGfAG5CG8SPDyPh-Z1edsTE3MYSxbXAaqkE5y4",
      "https://00e9e64bac5c424800fc28ea9d62122f51c6ae57836f4ff8b5-apidata.googleusercontent.com/download/storage/v1/b/miniwp17/o/icha-done.png?qk=AD5uMEvP00KsjzKrScqv5Vj52RsRY_8yxEgMT2R-yIQ-k2P3wUoMnyiIyQMYlIfYjDYFw1ajuFCVcs8_CQJc7x_UYlA4z-QO2n9Q3sR8Glc4rZd0_p7jThiQAExI3bz064zknWh1MWjsj784sX5epjxLr7Bq6QkM10YAG6EMNQ4XJqlZ7QSX0HJTI4M6ikDHZVkZDTruLtJGNmtKirgrdaDMb47Unm5-zJhGLsvrDnXG2r4WJ2pLcKvEXPuXqgfn_foNPRLjFPwXexJ25rnUajG56K5R5dTpbsEWUko6Ka4-HoHtroI0slB1-tOgE9AnJKpXkCDo1bYOHacJVW4C4mzXvqJjpsctxeQfDohwJT5IwgwBnssKIVWxBTd2qmgzu9zOoKACMpDja1lWKd4F0Xddo1be5NEhM4PZnq7Mzq9l44E0S8GJzufQUclvXLmlcmAsxXWLOXDl3GqmLPy1PyLrlhwMiPS1pbxl5GKyUhFN98QSwVj9kt8TY2i0u0DyfV03jIzyIjw3fynUaIC8sPLQGveP2KYvoWpDyz9kzeUf_fgvuzZexFvOwr8TU0Ja_WwG6S1gCzSZM-ZYuYt_tgMcYgoF6pjGsVfoNrP8NFKqdelgahKwheeKLnfhcdZ9OsamZV3DefarSnbw6gNNCtZFquXlq1qr2LJ_WrTnCiKho2kWZHzg-nvfJjsqZuyY_RZh7SYho3eZk5RFxLEzQuZAOo-NQGbNQ3k0UCd8PbVKnmp24gzIm4VjuRnZUrVOr4aY8kl1pUb9",
      "https://00e9e64bac5fcdcbc656ceba8f51d3b0e89df58d6b2d29b011-apidata.googleusercontent.com/download/storage/v1/b/miniwp17/o/rama-done.png?qk=AD5uMEt34vlb3ZCwPzjEIhjHqPQ8hF3B_m7A5N6rWdnBv8ZSCMDEMB9CPeQ3kBGg6bhVLPKBC6N34qFCaLBjIj8ial1wAQjAv39oN5JBmqhucwlLNiS86Dys3sf79MXovVyjcBEEvqmD9UCtYi-lZTuvqTvvmGpQ4MThMMybClREuLaBzx_Yqquql5OY80ZrJ6RfSztJ4vrk4Aaps7z9BmmDHgT0dRkhPfqHwANULNTz8K2lB_K0GvHYXtW-23rdFCcj-AUQrKiAupCbzNfAXE9Qo9fFnwmJDwsllMEgI2iM1Y1IGlQOFqs2YXDbOkQUwzCqT8X8lixa8YIlUpkwuOKFEWctYTbxpCKNIhN0CZcOpzoTuDEqt0bJIQxbUuWglQV-ByyUxcvhzo_P6NBiTyFXbnRnEn-_6_K_wDT1URb-RjgFP5lTMkLO7BnOmIpBirYNWCxM2aQQH4QVPxBtk7iMzy80mOdLb0VvnCm70uWrCMJ8qIghCRXh-8cGeZVs5IaD3FEA3XagMvdIlvwhJ_KIKXPUypRLQU6MXkNnmz5mrlSEs-T2A_KdVp-HNAaxRgI1DRSyPyIKEgmpoj4eNLSyz5RuYiZrGFf5RzmbU7lzqLR01aGnNiGKoNhGmCSUclLcvYzbcx42rOFw32gZiJM8fwAQVZkCrSAGm6UtZhOFISf2f8oPqvsPLolsM1nYzjcix4kJLkUsjydW54L1hQIPZeabyST9_ElbSkeRiK5ai4NdGMBsUl-Emh4bgnFTVODQqpldJMAy",
      "https://00e9e64bacc6ca41674707eca3d3a88ac362a409fe8b872234-apidata.googleusercontent.com/download/storage/v1/b/miniwp17/o/semi-done.png?qk=AD5uMEvrgEbHGxBv3IGkedcAIjhzCOEsn2g3n53rxRjDhDSCZLWEmHVr5rKswwLfRv7dKjEODGOwmQECutV3wvzETfIN0PiJ1Jw1CEDMme87V7qYsCbJnqyjfTemJ-SZgK_9oCxaq9r9kQJ1hKZYLboKL6Y3YQvX2tzkCYtgBSrOc8YBivaRye2EiJ5_A5090at5dVPTwGuctmGyUfUScDdExzJcFu-j9hpp_ZHZK_TVVBD_Y0IYuE84jp9ewsENA330nPZLdxG97_pm7l7UkIzQ4xH6PatcEAOad6UE-Y9A4BnHXjyOCxriQf9c2eEZzpAdUwMT_C4W_BQM3YOmS1mD7BeShkHhqpgOmnaVrqH-jTmrTNVsaYj9E6nNsRRA-MDjQb1xEMUJVEGpwBJPk_NqQ3htQJqmcS_f0PGSpRu0XhbuwdN_PA-15YoRgtC7Hv_qbB3bBWU9v_B5W6Nt9dNTzWUSLn66kboeVtS6nN7g-cR_xiVDGcPkQJzn35tzp_GgsuUTP_SKmz870jZ439B8WeMEC_eiStZJjgJ4dl7V_NdFkvpXFVpuHO4dsUw-0A81cHA0Kp1v6osI7Ig48E6Pxx2VisVjLADU7mpjKNSmFJMQrMbplighziIh_vGPbQbpPBMFoo2R0A36334L9absstAO8JJgWmRqvxECC3bMCubCYDrd0xwuVqwAJeOjLMm3hTrGq3mJNvF56LhMTsik8mjnDP4i3C39XplFRc3bNVfwjMPKnAgTXLBSit6BIMxsWNRwwOSJ",
      "https://00e9e64bacc360667be48ad3f611d5905da2aed517d68d627a-apidata.googleusercontent.com/download/storage/v1/b/miniwp17/o/yoki-done.png?qk=AD5uMEsSAHGqm8XEomBABIkw6sRkys6nlZZmIvNdHD7ZULrakcrbCOMgBFvT9T-oezfbY6kW7x9JBYP-rEgw745zxnKVBNSmzxUXWb3XDtWfGUmmAz2eZgkkuWj_3JoanyX2r-A0XJGWYJ_xLfm3L9DnYru3B0gv55C_wGEH1RPTAuQ4TPX4d1f-c2torU_ATx7Nt162mwbzJSHaRABud1W-DGjUnFVy3fj3lkgjNbFpp5BI2ON3FtLnbi9tUPWPk_17HcnhFqxrPmo38zzZNNX8yUJq1qm9yvrM-YGGrqemVEMSj5uY49G0FrswgMJziqh4F_MD93yfkdHHSJtMTN0p9iYbIrNvvU2jNeqZt3NLJvPdeEJwMeL0d0jUcO4pEIUy7Bk55TFjhuxH265uu9GYHqV-QJeYZVbgiyHIfQv4bAK4FE-s9tTVRW6hMw8brYcZXRhaisMX73F4HV7UQn-LFug7UuMW0W1ZgyFeGPOGfTqbfnahxjvmHB7bDlNvhY3Xl1KmiiLzy33TsqfQveIp3yCfKzcOvKQw8b7jNkiVEfGBTHXYKeCwG2vqvcX2VD8zqTMJuC7HCbHmFU2JFAt26vgPIOSsvDbFH3-QiHm8qWObLXFGaKGumAkwAv3QjK43YNoir93DFED0DHS7zP_EeNBBnSR5oK34kiQUDbbWz2ZI-yxzXipSvCmwE0oSqnrROj738Vr6hEF6VAzNyeKGyy6kwWPKKej91v_Krl_Jw9DcO6Is43-Y9fx6Woh-qSBnCj3-tsak"],
      image2: "https://www.evershine.com/wp-content/uploads/2017/11/60T90-Black.jpg",
      image: '',
      persen: '',
    };
  },
  mounted() {
    this.init();
    this.timer();
  },
  watch: {
    point: function(val) {
      this.persen = val + "%";
    }
  },
  // computed:{
  //   randomImage() {

  //     console.log(this.image1[Math.floor(Math.random()* 6)])
  //   }
  // },
  methods: {
    randomImage() {
      this.image = this.image1[Math.floor(Math.random()* 6)]
    },
    timer() {
      setTimeout(() => {
        console.log("MASUK");
        this.$router.push("/result");
      }, 100000);
    },
    init() {
      const first = this.mole_grid.length;
      const second = this.mole_grid[0].length;
      this.getRandomInt();
      setInterval(() => {

        this.randomImage()
        // console.log(this.randomImage);
        
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
    }
  }
};
</script>

<style scoped>
@import url("https://rsms.me/inter/inter.css");

img{
  width: 100%;
  height: 100%;
}
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
  /* border-radius: 10%; */
  width: 11rem;
  height: 14rem;
  margin: 0.3rem;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
