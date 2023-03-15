<template>
  <b-container fluid :style="layoutHeight">
    <br>
    <section class="Alert">
      <b-alert :variant="alertVariant" :show="alertCountDown" @dismissed="alertCountDown=0"
               @dismiss-count-down="countDownChanged"
               data-aos="fade-down"
               data-aos-anchor-placement="top-bottom"
               data-aos-duration="800">
        <h4 :class="'text-'+alertVariant+' mt-3 mb-4'"
            data-aos="fade-down"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
            data-aos-duration="800">{{ alertMessage }}</h4>
        <b-progress :variant="alertVariant" :max="alertMax" :value="alertCountDown" height="4px"
                    data-aos="zoom-in"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="100"
                    data-aos-duration="800"></b-progress>
      </b-alert>
    </section>

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
              <b-row v-for="(items, index) in filterCards" :key="index" align-h="center" style="min-height: 400px;"
                     data-aos="fade-up"
                     data-aos-duration="500"
                     data-aos-anchor-placement="top-bottom">
                <b-card class="m-3 card-main" no-body>

                  <b-row align-h="center" align-v="center">
                    <b-col class="col-img-card p-0" cols="12" xl="6" lg="6">
                      <b-img class="img-card" :src="items.UrlImage" fluid style=""></b-img>
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
                            <span v-for="(item, jIndex) in items.filtres.body" :key="jIndex" class="card-text"> <b class="card-text-title"> {{items.filtres.title[jIndex]}} : </b> {{item}}<span v-if="jIndex === items.filtres.body.length - 1">.</span><span v-else>, </span></span>
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
                            <b-button class="button"
                                      @click="verifyAccount('account-error-modal', items.idCourse)">
                              Faire une réservation</b-button>
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
      filrs: null,
      alertMax: 20,
      alertCountDown: 0,
      alertMessage: null,
      alertVariant: null,
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
    countDownChanged(dismissCountDown) {
      this.alertCountDown = dismissCountDown;
    },
    showAlert(message, variant) {
      this.alertMessage = message;
      this.alertVariant = variant;
      this.alertCountDown = this.alertMax;
    },
    async verifyAccount(modal, idCourse){
      if (this.userInfos.data.id === -1) this.showLoginErrorModal(modal);
      else {
        if (this.userInfos.data.admin !== null) {
          let message = `Vous ne pouvez pas faire de réservation !`;
          let variant = `warning`;
          if (self.alertCountDown > 0) self.alertCountDown = 0;
          setTimeout(() => {
            this.showAlert(message, variant);
            window.scrollTo(0,0);
          }, "200")
        } else {
          let date = new Date();
          let idPublic = this.userInfos.data.id;
          await axios.post(`http://localhost:3000/reservation/courses`, {data: {date, idPublic, idCourse}})
              .then(async result => {
                let message = `Votre réservation a bien été enregistrée`;
                let variant = `success`;
                if (self.alertCountDown > 0) self.alertCountDown = 0;
                setTimeout(() => {
                  this.showAlert(message, variant);
                  window.scrollTo(0,0);
                }, "200")
              })
              .catch((err) => {
                let message = typeof err.response !== "undefined" ? err.response.data.data : err.message;
                console.warn("error", message);
                message = err.response.data.data;
                //message = `Problème lors de l'enregistrement de votre réservation !`;
                let variant = `danger`;
                if (self.alertCountDown > 0) self.alertCountDown = 0;
                setTimeout(() => {
                  this.showAlert(message, variant);
                  window.scrollTo(0,0);
                }, "200")
              });
        }
      }
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
          self.data = result.data.data
          self.filrs = []
          for (let i = 0; i < this.data.getFiltres.length + 1; i++) {
            self.filrs.push("");
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