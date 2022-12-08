<template>
  <prestataire-presentation-component :layout-height="layoutHeight" :title="title" :get-filtres="getFiltres" :get-cards="getCards"/>
</template>

<script>
import axios from "axios";
import prestatairePresentationComponent from "@/views/prestataire/prestataires/categories.vue";
export default {
  name: "restaurants",
  components: {
    'prestataire-presentation-component':prestatairePresentationComponent
  },
  data: () => ({
    layoutHeight: "margin-top : "+59+"px",
    title: null,
    getFiltres: null,
    getCards: null
  }),
  async created() {
    await axios.get('http://localhost:3000/restaurants')
        .then(result => {
          this.title = result.data.title;
          this.getFiltres = result.data.getFiltres;
          this.getCards = result.data.getCards;
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