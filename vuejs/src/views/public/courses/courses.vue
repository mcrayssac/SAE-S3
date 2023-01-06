<template>
  <b-container fluid :style="layoutHeight">
    <section v-if="data !== null" class="Body">
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

                          <b-button class="button" @click="verifyAccount('account-error-modal')">Voir la page</b-button>
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

      <b-modal body-text-variant="danger" ref="account-error-modal" title="Lakeside Sports Festival" hide-header-close>
        <b-col class="my-3">
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: x-large; font-family: 'Montserrat', sans-serif;">Vous n'êtes pas connecté !</span>
            </b-col>
          </b-row>
          <b-row class="my-1" align-h="center">
            <b-col cols="auto">
              <span style="font-size: small; font-family: 'Montserrat', sans-serif;">Veuillez-vous connecter avant de poursuivre</span>
            </b-col>
          </b-row>
        </b-col>
        <template #modal-footer >
          <b-row class="mx-auto" align-h="center">
            <b-col cols="auto">
              <b-button class="button" @click="hideLoginErrorModal('account-error-modal')">Close</b-button>
            </b-col>
          </b-row>
        </template>
      </b-modal>
    </section>
    <section v-else class="Loading">
      <app-loading color="#6ec8cb" />
    </section>
  </b-container>
</template>

<script>
import _ from 'lodash';
import {mapState} from "vuex";
import appLoading from "@/loading";
import axios from "axios";

export default {
  name: "courses",
  data: function() {
    return {
      data: null,
      filrs: null
    }
  },
  components: {appLoading},
  computed:{
    ...mapState(['userInfos', 'layoutHeight']),
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
  methods:{
    verifyAccount(modal){
      if (this.userInfos.id === -1) this.showLoginErrorModal(modal);
      else console.log("Account ready")
    },
    showLoginErrorModal(modal) {
      this.$refs[modal].show()
    },
    hideLoginErrorModal(modal) {
      this.$refs[modal].hide()
    }
  },
  async created() {
    let self = this;
    await axios.get(`http://localhost:3000/competitions`)
        .then(async result => {
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

</style>