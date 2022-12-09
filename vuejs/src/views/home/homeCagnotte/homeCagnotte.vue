<template>
  <section v-if="pourcentage && cagnotteObjectif && cagnotteRecolte && cagnotte" class="Cagnotte">
    <b-row class="m-5 ligne"></b-row>
      <b-row align-h="center">
        <b-col data-aos="zoom-in-down"
               data-aos-offset="350"
               data-aos-duration="8000"
               cols="auto" class="m-5"><h1>Notre cagnotte</h1></b-col>
      </b-row>
      <b-row align-h="center">
        <app-home-circular-progress data-aos="zoom-in-right"
                                    data-aos-offset="300"
                                    data-aos-duration="1000"
                                    :pourcentage="pourcentage" class="mb-5" />
        <b-col cols="auto" class="mb-5" style="font-size: xx-large;
                    font-family: 'Montserrat', sans-serif; font-weight: 300; vertical-align: center;">
          <b-row data-aos="fade-left"
                 data-aos-offset="300"
                 data-aos-duration="1000"
                 align-h="center">
            <a style="color: #495388;"><a style="color: #6ec8cb; font-size: xxx-large;" id="compteur">{{placeDot(cagnotte)}}</a> € récoltés</a>
          </b-row>
          <b-row data-aos="fade-right"
                 data-aos-offset="200"
                 data-aos-duration="1000"
                 align-h="center">
            <a style="color: #495388;">Objectif : <a id="objectif" style="color: #6ec8cb; font-size: xxx-large;">{{placeDot(cagnotteObjectif)}}</a> €</a>
          </b-row>
        </b-col>
      </b-row>
  </section>
</template>

<script>
import appHomeCircularProgress from "@/views/home/homeCircularProgress/homeCircularProgress.vue";
import axios from "axios";
export default {
  name: "homeCagnotte",
  components: {
    'app-home-circular-progress':appHomeCircularProgress
  },
  data:()=>{
    return {
      cagnotteRecolte : null,
      cagnotteObjectif : null,
      gradient: {
        radial: false,
        colors: [
          {
            color: '#6ec8cb',
            offset: "0",
            opacity: '1',
          },
          {
            color: '#d9231a',
            offset: "100",
            opacity: '1',
          },
        ]
      },
      cagnotte: null,
      cagnotteTop: null,
      pourcentage: null
    }
  },
  methods:{
    dotReplaced(str){
      return parseInt(str.toString().replace(/\./g, ''));
    },
    placeDot(str){
      return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    timer: function() {
      setInterval(this.tikTok, 125);
    },
    tikTok: function() {
      if (this.cagnotte >= this.cagnotteTop) {
        if (Math.random() > 0.95)
          this.cagnotte += 1;
      }
      else {
        if (this.cagnotte<this.cagnotteTop-999990)
          this.cagnotte+=1;
        else if (this.cagnotte<this.cagnotteTop-999900)
          this.cagnotte+=10;
        else if (this.cagnotte<this.cagnotteTop-999000)
          this.cagnotte+=100;
        else if (this.cagnotte<this.cagnotteTop-990000)
          this.cagnotte+=1000;
        else if (this.cagnotte<this.cagnotteTop-900000)
          this.cagnotte+=10000;
        else if (this.cagnotte<this.cagnotteTop)
          this.cagnotte+=100000;
      }
    }
  },
  mounted() {
    this.cagnotteTop = this.cagnotte;
    this.cagnotte-=1000000;
    /*this.$nextTick(() => {
      this.timer();
    });*/
  },
  async created() {
    await axios.get(`http://localhost:3000/cagnotte`)
        .then(result => {
          this.cagnotte = result.data.getCagnotte.cagnotte;
          this.cagnotteRecolte = result.data.getCagnotte.cagnotte;
          this.cagnotteObjectif = result.data.getCagnotte.objectif;
          this.pourcentage = result.data.getCagnotte.pourcentage;
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
  }
}
</script>

<style scoped>

</style>