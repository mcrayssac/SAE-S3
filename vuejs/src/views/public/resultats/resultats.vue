<template>
  <b-container :style="layoutHeight" fluid>
    <section v-if="data !== null" class="Body">
      <section class="Title">
        <b-row align-h="center" align-v="center">
          <b-col cols="auto">
            <h1 class="my-5" data-aos="fade-up-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="800">Résultats pour {{name}}</h1>
          </b-col>
        </b-row>
      </section>

      <section v-if="data !== false" class="mt-5 Main-resultats" style="min-height: 300px;">
        <b-row align-h="center" align-v="center">
          <b-col cols="auto" lg="10">
            <b-table-simple bordered hover data-aos="flip-left"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration="800">
              <b-thead style="background-color: #495388; color: white">
                <b-tr>
                  <b-th v-for="(item, index) in Object.keys(data.data.data[0])" :key="index"
                        data-aos="fade-left"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delay+=300"
                        data-aos-duration="500">{{item}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody  style="color: white">
                <b-tr v-if="first !== null" style="background-color: #ffba00">
                  <b-th class="text-center"
                        data-aos="zoom-in"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delayFirst+=300"
                        data-aos-duration="500">{{ first.Classement }}</b-th>
                  <b-th class="text-center"
                        data-aos="zoom-in"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delayFirst+=300"
                        data-aos-duration="500">{{ first.Prénom }}</b-th>
                  <b-th class="text-center"
                        data-aos="zoom-in"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delayFirst+=300"
                        data-aos-duration="500">{{ first.Nom }}</b-th>
                  <b-th class="text-center"
                        data-aos="zoom-in"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delayFirst+=300"
                        data-aos-duration="500">{{ first["Nombre de place"] }}</b-th>
                  <b-th class="text-center"
                        data-aos="zoom-in"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delayFirst+=300"
                        data-aos-duration="500">{{ first["Nombre de km"] }}</b-th>
                </b-tr>
                <b-tr v-else-if="second !== null" style="background-color: #c9c8c8">
                  <b-th class="text-center">{{ second.Classement }}</b-th>
                  <b-th class="text-center">{{ second.Prénom }}</b-th>
                  <b-th class="text-center">{{ second.Nom }}</b-th>
                  <b-th class="text-center">{{ second["Nombre de place"] }}</b-th>
                  <b-th class="text-center">{{ second["Nombre de km"] }}</b-th>
                </b-tr>
                <b-tr v-else-if="third !== null" style="background-color: #bd985b">
                  <b-th class="text-center">{{ third.Classement }}</b-th>
                  <b-th class="text-center">{{ third.Prénom }}</b-th>
                  <b-th class="text-center">{{ third.Nom }}</b-th>
                  <b-th class="text-center">{{ third["Nombre de place"] }}</b-th>
                  <b-th class="text-center">{{ third["Nombre de km"] }}</b-th>
                </b-tr>
                <b-tr style="background-color: #6ec8cb" v-for="(item, index) in data.data.data" :key="index"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="500">
                  <b-th v-for="(item2, Jindex) in Object.values(item)" :key="Jindex" class="text-center">{{item2}}</b-th>
                </b-tr>
              </b-tbody>
              <b-tfoot style="background-color: #495388; color: white">
                <b-tr>
                  <b-td v-if="rows !== null" :colspan="Object.keys(data.data.data[0]).length" class="text-right"
                        data-aos="fade-left"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="delay+=300"
                        data-aos-duration="500">
                    Nombre de participants: <b>{{ rows }}</b>
                  </b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
          </b-col>
        </b-row>
      </section>

      <section v-else class="mt-5 Main-none" style="min-height: 300px;">
        <h6>Aucun résultat disponible pour le moment</h6>
      </section>
    </section>
    <section v-else class="Loading">
      <app-loading/>
    </section>
  </b-container>
</template>

<script>
import axios from "axios";
import appLoading from "@/loading";
import {mapState} from "vuex";
export default {
  name: "resultats",
  components: {appLoading},
  data: function() {
    return {
      data: null,
      name: null,
      first: null,
      second: null,
      third: null,
      rows: null,
      delay: 300,
      delayFirst: 1200
    }
  },
  methods:{
    dataSplice: async function(){
      await this.data.data.data.forEach(elt => {
        if (elt.Classement && elt.Classement === 1) {
          this.first = elt;
          this.data.data.data.splice(this.data.data.data.indexOf(elt), 1);
        } else if (elt.Classement && elt.Classement === 2) {
          this.second = elt;
          this.data.data.data.splice(this.data.data.data.indexOf(elt), 1);
        } else if (elt.Classement && elt.Classement === 3) {
          this.third = elt;
          this.data.data.data.splice(this.data.data.data.indexOf(elt), 1);
        }
      })
    }
  },
  computed:{
    ...mapState(['userInfos', 'layoutHeight'])
  },
  async created() {
    let self = this;
    await axios.get(`http://localhost:3000/resultats/${this.$route.params.nomCompetition}`)
        .then(async result => {
          console.log("Res : ",result.data.data)
          if (result.data.data.data.length === 0) {
            self.name = await result.data.data.name;
            self.data = false;
          } else {
            self.name = await result.data.data.name;
            self.data = await result.data
            self.rows = result.data.data.data.length;
            await self.dataSplice();
          }

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