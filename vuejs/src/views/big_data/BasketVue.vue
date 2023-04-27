<template>
  <div :style="layoutHeight">
    <h1>Liste des ligues de basketball</h1>
    <span v-for="league in leagues" :key="league.name">
      <h2>{{ league.name }}</h2>
      <div class="d-flex align-items-center" style="text-align: center">
          <img :src="league.logo" :alt="league.name + ' logo'" class="img-fluid mr-3" style="max-height: 100px;">
          <p>Type : {{ league.type }}</p>
      </div>
      <h5>Saisons :</h5>
      <b-row align-h="center" align-v="center">
          <b-col cols="auto" lg="10">
            <b-table-simple bordered hover data-aos="flip-left"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration="800">
              <b-thead style="background-color: #495388; color: white">
                <b-tr>
                  <b-th class="text-center">Année</b-th>
                  <b-th class="text-center">Date de début</b-th>
                  <b-th class="text-center">Date de fin</b-th>
                </b-tr>
              </b-thead>
              <b-tbody  style="color: white">
                <b-tr style="background-color: #6ec8cb" v-for="season in league.seasons" :key="season.season"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="500">
                  <b-th class="text-center">{{ season.season }}</b-th>
                  <b-th class="text-center">{{ season.start }}</b-th>
                  <b-th class="text-center">{{ season.end }}</b-th>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>
    </span>
  </div>
</template>


<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "BasketVue",
  data() {
    return {
      leagues: []
    };
  },
  computed:{
    ...mapState(['layoutHeight'])
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/basket");
        this.leagues = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>

</style>
