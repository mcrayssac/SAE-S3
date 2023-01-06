<template>
  <b-container fluid :style="layoutHeight">
    <section v-if="!data" class="Loading">
      <app-loading color="#6ec8cb" />
    </section>
    <section v-else class="Main">
      <section class="Title">
        <b-row align-h="center" align-v="center">
          <b-col class="m-5" cols="auto">
            <b-row align-h="center">
              <b-col cols="auto" data-aos="fade-right"
                     data-aos-delay="500"
                     data-aos-duration="500"
                     data-aos-anchor-placement="top-center">
                <h2>{{ data.title }}</h2>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="m-5" cols="auto">
            <b-row align-h="center" cols="auto" data-aos="fade-right"
                   data-aos-delay="300"
                   data-aos-duration="500"
                   data-aos-anchor-placement="top-center">
              <b-form inline>
                <b-form-input placeholder="Rechercher" v-model="filrs[filrs.length - 1]"></b-form-input>
              </b-form>
            </b-row>
          </b-col>
          <b-col v-if="data.getFiltres" class="m-5" cols="auto" data-aos="fade-right"
                 data-aos-delay="100"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-center">
            <b-row align-h="center">
              <b-col cols="auto" v-for="(items, index) in data.getFiltres" :key="index">
                <b-form-select v-model="filrs[index]" size="lg">
                  <template #first>
                    <b-form-select-option :value="''" disabled>{{items[0]}}</b-form-select-option>
                  </template>
                  <b-form-select-option :value="''">Tous[{{items[1].length}}]</b-form-select-option>
                  <b-form-select-option v-for="(item, jndex) in items[1]" :key="jndex" :value="item">{{item}}</b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </section>

      <b-container>
        <section class="Card">
          <b-row v-if="data.getCards" align-h="center">
            <b-col class="m-5" cols="auto" style="min-width: 100%;">
              <b-row v-for="(items, index) in filterCards" :key="index" align-h="center">

                <b-card class="m-3" data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="500"
                        data-aos-anchor-placement="top-bottom">

                  <b-row>
                    <b-col cols="auto">
                      <b-img class="card-image" height="300" width="300" :src="items.url" :alt="items.title"></b-img>
                    </b-col>

                    <b-col cols="auto">
                      <b-card-body :title="items.title" style="border-left: 5px solid #495388;">
                        <b-card-text>
                          <p v-for="(item, jIndex) in items.filtres.body" :key="jIndex" class="card-text"> <b> {{items.filtres.title[jIndex]}} : </b> {{item}}</p>

                          <b-button class="button" @click="$router.push({ name: 'prestataires/nomPrestataire', params: { nomPrestataire: items.title.toLowerCase().trim().replace(/ /g,'')} })">Voir la page</b-button>
                        </b-card-text>
                      </b-card-body>
                    </b-col>

                  </b-row>

                </b-card>

              </b-row>
            </b-col>
          </b-row>
        </section>
      </b-container>
    </section>
  </b-container>
</template>

<script>
import _ from 'lodash';
import axios from "axios";
import appLoading from "@/loading.vue"
import {mapState} from "vuex";
export default {
  name: "categories",
  components: {appLoading},
  data: () => ({
    inputFilter: '',
    selected:null,
    data: null,
    filrs: null
  }),
  computed: {
    ...mapState(['layoutHeight']),
    filteredArticles() {
      return this.data.getCards.filter((element) => {
        return element.title.toLowerCase().match(this.inputFilter.toLowerCase());
      });
    },
    filterCards() {
      let vm = this, lists = vm.data.getCards
      return _.filter(lists, function (query) {
        let temp;
        let res = true;
        if (vm.filrs[vm.filrs.length - 1] == ""){
          for (let i = 0; i < vm.filrs.length; i++) {
            temp = vm.filrs[i] ? (query.filtres.body[i] == vm.filrs[i]) : true;
            res = res && temp;
          }
        } else res = vm.filrs[vm.filrs.length - 1] ? (query.title.toLowerCase().match(vm.filrs[vm.filrs.length - 1].toLowerCase())) : true;
        return res;
      })
    }
  },
  async created() {
    await axios.get(`http://localhost:3000/categories/${this.$route.params.nomCategorie}`)
        .then(result => {
          this.data = result.data
          this.filrs = []
          for (let i = 0; i < this.data.getFiltres.length + 1; i++) {
            this.filrs.push("");
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
@import '../../../../public/css/prestataires/prestataires/prestatairePresentationComponent.css';
</style>