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
              <b-row v-for="(items, index) in filterCards" :key="index" align-h="center" style="min-height: 400px;"
                     data-aos="fade-up"
                     data-aos-duration="500"
                     data-aos-anchor-placement="top-bottom">
                <b-card class="m-3 card-main" no-body>

                  <b-row align-h="center" align-v="center">
                    <b-col class="col-img-card p-0" cols="12" xl="6" lg="6">
                      <b-img class="img-card" :src="items.urlImage" fluid style=""></b-img>
                    </b-col>
                    <b-col class="p-3" cols="12" xl="6" lg="6" >
                      <b-row class="my-3" align-h="center" align-v="center">
                        <b-col class="text-center" cols="auto">
                          <span class="card-title">{{items.title}}</span>
                        </b-col>
                      </b-row>
                      <b-row align-h="center" align-v="center">
                        <b-col cols="12">
                          <hr class="mx-5">
                        </b-col>
                      </b-row>
                      <b-row class="my-3 mx-5" align-h="start" align-v="center">
                        <b-col cols="12">
                          <b-col cols="auto">
                            <span class="card-text-title">
                              <b> Filtres : </b>
                              <span class="card-text" v-for="(item, jIndex) in items.filtres.body" :key="jIndex">{{item}}<span v-if="jIndex === items.filtres.body.length - 1">.</span><span v-else>, </span>
                              </span>
                            </span>

                          </b-col>
                        </b-col>
                      </b-row>
                      <b-row align-h="center" align-v="center">
                        <b-col cols="12">
                          <hr class="mx-5">
                        </b-col>
                      </b-row>
                      <b-row class="my-3" align-h="center" align-v="center">
                        <b-col cols="auto">
                          <span>
                            <b-row class="m-5" align-h="center" align-v="center">
                              <b-col cols="auto">
                                <b-button class="button mx-2"
                                          @click="goToPage(items.id, items.Site, null, true)">
                                  Voir le site</b-button>
                                <b-button class="button mx-2"
                                   @click="goToPage(items.id, null, items, false)">Voir la page</b-button>
                              </b-col>
                            </b-row>
                          </span>
                        </b-col>
                      </b-row>
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
    filterCards() {
      let vm = this, lists = vm.data.getCards
      return _.filter(lists, function (query) {
        let temp;
        let res = true;
        if (vm.filrs[vm.filrs.length - 1] == ""){
          for (let i = 0; i < vm.filrs.length; i++) {
            temp = vm.filrs[i] ? (query.filtres.body.includes(vm.filrs[i])) : true;
            res = res && temp;
          }
        } else res = vm.filrs[vm.filrs.length - 1] ? (query.title.toLowerCase().match(vm.filrs[vm.filrs.length - 1].toLowerCase())) : true;
        return res;
      })
    }
  },
  methods: {
    async goToPage(id, site, page, ifSite) {
      let self = this;
      await axios.put(`http://localhost:3000/statistiques/prestataire/clics/date/${id}`)
          .then(result => {
            if (ifSite) {
              window.open(site, '_blank');
            } else {
              self.$router.push({ name: 'prestataires/nomPrestataire', params: { nomPrestataire: page.title.toLowerCase().trim().replace(/ /g,'')} })
            }

          })
          .catch((err) => {
            let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            console.warn("error goToPage", message);
          });
      //$router.push({ name: 'prestataires/nomPrestataire', params: { nomPrestataire: items.title.toLowerCase().trim().replace(/ /g,'')} })
    }
  },
  async created() {
    await axios.get(`http://localhost:3000/categories/${this.$route.params.nomCategorie}`)
        .then(result => {
          this.data = result.data.data
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