<template>
  <prestataire-presentation-component :layout-height="layoutHeight" :title="title" :get-filtres="getFiltres" :get-cards="getCards"/>
</template>

<script>
import axios from "axios";
import prestatairePresentationComponent from "@/views/prestataire/prestataires/categories.vue";
import {mapState} from "vuex";
export default {
  name: "restaurants",
  components: {
    'prestataire-presentation-component':prestatairePresentationComponent
  },
  data: () => ({
    title: null,
    getFiltres: null,
    getCards: null
  }),
  computed:{
    ...mapState(['layoutHeight'])
  },
  async created() {
    let self = this;
    await axios.get('http://localhost:3000/restaurants')
        .then(result => {
          self.title = result.data.title;
          self.getFiltres = result.data.getFiltres;
          self.getCards = result.data.getCards;
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