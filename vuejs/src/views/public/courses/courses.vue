<template>
  <b-container fluid :style="layoutHeight">
    <section v-if="true" class="Body">
      <section class="Title">
        <b-row align-h="center" align-v="center">
          <b-col class="m-5" cols="auto">
            <b-row align-h="center">
              <b-col cols="auto" data-aos="fade-right"
                     data-aos-delay="500"
                     data-aos-duration="500"
                     data-aos-anchor-placement="top-center">
                <h2>Compétitions</h2>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </section>

      {{data}}

      <section class="mt-5 Main-none" style="min-height: 300px;">
        <h6>Aucunes compétitions disponible pour le moment</h6>
      </section>
    </section>
    <section v-else class="Loading">
      <app-loading/>
    </section>
  </b-container>
</template>

<script>
import {mapState} from "vuex";
import appLoading from "@/loading";
import axios from "axios";

export default {
  name: "courses",
  components: {appLoading},
  computed:{
    ...mapState(['layoutHeight'])
  },
  data: function() {
    return {
      data: null
    }
  },
  async created() {
    let self = this;
    await axios.get(`http://localhost:3000/competitions`)
        .then(async result => {
          self.data = result.data
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