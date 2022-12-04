<template>
  <b-row align-h="center">
    <b-col class="nbGroup" data-aos="flip-right"
           data-aos-anchor-placement="bottom-bottom"
           data-aos-duration="1000"
           data-aos-delay="800"
           cols="auto">
      <b-row align-h="center">
        <b-col class="nbTitle Nunito" cols="auto">{{localTime.day}}</b-col>
      </b-row>
      <b-row align-h="center">
        <b-col class="nbContent Nunito" cols="auto">Jours</b-col>
      </b-row>
    </b-col>

    <b-col class="nbGroup" data-aos="flip-right"
           data-aos-anchor-placement="bottom-bottom"
           data-aos-duration="1000"
           data-aos-delay="400"
           cols="auto">
      <b-row align-h="center">
        <b-col class="nbTitle Nunito" cols="auto">{{localTime.hour}}</b-col>
      </b-row>
      <b-row align-h="center">
        <b-col class="nbContent Nunito" cols="auto">Heures</b-col>
      </b-row>
    </b-col>

    <b-col class="nbGroup" data-aos="flip-right"
           data-aos-anchor-placement="bottom-bottom"
           data-aos-duration="1000"
           data-aos-delay="200"
           cols="auto">
      <b-row align-h="center">
        <b-col class="nbTitle Nunito" cols="auto">{{localTime.min}}</b-col>
      </b-row>
      <b-row align-h="center">
        <b-col class="nbContent Nunito" cols="auto">Minutes</b-col>
      </b-row>
    </b-col>

    <b-col class="nbGroup" data-aos="flip-right"
           data-aos-anchor-placement="bottom-bottom"
           data-aos-duration="1000"
           cols="auto">
      <b-row align-h="center">
        <b-col class="nbTitle Nunito" cols="auto">{{localTime.sec}}</b-col>
      </b-row>
      <b-row align-h="center">
        <b-col class="nbContent Nunito" cols="auto">Secondes</b-col>
      </b-row>
    </b-col>
  </b-row>

</template>

<script>
export default {
  name: "homeCompteRebour",
  data: () => ({
    localTime: " "
  }),
  methods:{
    setCagnotte: function () {
      let time = this;
      setInterval(function () {
        let Date1 = new Date();
        let Date2 = new Date(2023, 8, 15, 8, 0);
        time.localTime = time.dateDiff(Date1, Date2);
      }, 0);
    },
    dateDiff: function (date1, date2){
      var diff = {}                           // Initialisation du retour
      var tmp = date2 - date1;

      tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
      diff.sec = tmp % 60;                    // Extraction du nombre de secondes

      tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
      diff.min = tmp % 60;                    // Extraction du nombre de minutes

      tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
      diff.hour = tmp % 24;                   // Extraction du nombre d'heures

      tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
      diff.day = tmp-31;

      return diff;
    }
  },
  mounted() {
    this.setCagnotte();
  }
}
</script>

<style scoped>
@import '../../../../public/css/home/homeCompteRebour/homeCompteRebour.css';
</style>