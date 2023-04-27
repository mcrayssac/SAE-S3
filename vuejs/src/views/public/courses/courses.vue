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
          <b-col cols="auto">
            <span v-if="userInfos.admin == 'organisateur'">
            <b-button class="mx-1" @click="$refs['modal-edit-course'].show()"
                      data-aos="flip-left" variant="outline-success"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="400">Ajouter</b-button>
            </span>
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
                          <span v-if="userInfos.admin == 'organisateur'">
                            <b-button class="button button-submit mx-1"
                                      @click="setCurrentCourse(items)">
                              Modifier la course </b-button>
                            <b-button class="button button-decline mx-1"
                                      @click="deleteCourse(items)">
                              Supprimer la course </b-button>
                            <b-button class="button button-decline mx-1"
                                      @click="$router.replace({path: `/resultats/${items.title.toLowerCase().replaceAll(' ', '')}`})">
                              Classement </b-button>
                          </span>
                          <span v-else>
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
              <b-modal ref="modal-edit-course" hide-footer hide-backdrop hide-header-close no-fade no-stacking centered id="modal-presta"
                       :title="currentEvent.id_course != -1 ? `Modifier la course ${currentEvent.title}` : 'Ajouter une nouvelle course'">
                <b-form>
                  <b-form-group class="mx-5 my-3" label="Nom de la course : " label-class="label"
                                data-aos="fade-left"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration="800">
                    <b-form-input v-model="currentEvent.title" type="text" required></b-form-input>
                  </b-form-group>

                  <b-form-group class="mx-5 my-3" label="Nombre de places : " label-class="label"
                                data-aos="fade-left"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration="800">
                    <b-form-input v-model="currentEvent.nb_places" type="number" required></b-form-input>
                  </b-form-group>

                  <b-form-group class="mx-5 my-3" label="Nombre de km : " label-class="label"
                                data-aos="fade-left"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration="800">
                    <b-form-input v-model="currentEvent.nb_km" type="number" required></b-form-input>
                  </b-form-group>

                  <b-form-group class="mx-5 my-3" label="Prix de l'inscription : " label-class="label"
                                data-aos="fade-left"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration="800">
                    <b-form-input v-model="currentEvent.prix" type="number" step=".01" required></b-form-input>
                  </b-form-group>

                  <b-form-group class="mx-5 my-3" label="Catégorie de la course : " label-class="label"
                                data-aos="fade-left"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration="800">
                    <b-form-select v-model="currentEvent.libelle_sport" required>
                      <b-form-select-option v-for="(sport, index) in sports" :key="index" :value="sport.libelle_sport"> {{sport.libelle_sport}} </b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group class="mx-5 my-3" label="Lieu de la course : " label-class="label"
                                data-aos="fade-left"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration="800">
                    <b-form-select v-model="currentEvent.libelle_lieu" :options="['Forêt', 'Lac', 'Routes']" style="width: 100%; margin-top: 5px" required></b-form-select >
                  </b-form-group>

                </b-form>

                <b-row class="m-5" align-h="center" align-v="center">
                  <b-col cols="auto">
                    <b-button v-if="currentEvent.id_course != -1" class="mx-2 button-submit" @click="modifyCourse"
                              data-aos="flip-left" variant="outline-success"
                              data-aos-anchor-placement="top-bottom"
                              data-aos-duration="400">Modifier</b-button>
                    <b-button v-else class="mx-2 button-submit" @click="addCourse"
                              data-aos="flip-left" variant="outline-success"
                              data-aos-anchor-placement="top-bottom"
                              data-aos-duration="400">Ajouter</b-button>
                    <b-button class="mx-2 button-decline"
                              data-aos="flip-right" variant="outline-secondary"
                              data-aos-anchor-placement="top-bottom"
                              data-aos-delay="400" @click="$refs['modal-edit-course'].hide(); resetCurrentCourse()"
                              data-aos-duration="400">Fermer</b-button>
                  </b-col>
                </b-row>
              </b-modal>
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
      <h4 data-aos="flip-left"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="800">Aucune course disponible</h4>
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
      sports: [],
      currentEvent: {
        id_course: -1,
        title: "",
        nb_places: 0,
        nb_km: 0,
        prix: 0,
        libelle_sport: "",
        libelle_lieu: ""
      }
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
      if (this.userInfos.id === -1) this.showLoginErrorModal(modal);
      else {
        if (this.userInfos.admin !== null) {
          let message = `Vous ne pouvez pas faire de réservation !`;
          let variant = `warning`;
          if (self.alertCountDown > 0) self.alertCountDown = 0;
          setTimeout(() => {
            this.showAlert(message, variant);
            window.scrollTo(0,0);
          }, "200")
        } else {
          let date = new Date();
          let idPublic = this.userInfos.id;
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
    },
    async getCompetitions(){
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
    ,
    deleteCourse(course){
      if (confirm(`Voulez-vous supprimer la course '${course.title}' ?`)) {
        try {
          let response = axios.delete(`http://localhost:3000/competitions/${course.idCourse}`)
          this.getCompetitions()
          if (this.alertCountDown > 0) this.alertCountDown = 0;
          setTimeout(() => {
            this.showAlert(`Vous avez supprimé la course "${course.title}"`, "success");
            window.scrollTo(0,0);
          }, "200")
        } catch (e) {
          console.warn("error deleteCourse", e)
        }
      }
    },
    setCurrentCourse(course){
      this.currentEvent.id_course = course.idCourse
      this.currentEvent.title = course.title
      this.currentEvent.nb_places = course.filtres.body[1]
      this.currentEvent.nb_km = course.filtres.body[0]
      this.currentEvent.prix = course.filtres.body[2]
      this.currentEvent.libelle_sport = course.filtres.body[3]
      this.currentEvent.libelle_lieu = course.filtres.body[4]
      this.$refs["modal-edit-course"].show()
    },
    getSports(){
      axios.get(`http://localhost:3000/competitions/sports`)
          .then(response => {
            this.sports = response.data.data
          })
          .catch(e => {
            console.log('err getSports : ', e)
            this.sports = []
          })
    },
    modifyCourse(){
      try {
        let response = axios.put(`http://localhost:3000/competitions/${this.currentEvent.id_course}?libelle=${this.currentEvent.title}&km=${this.currentEvent.nb_km}&places=${this.currentEvent.nb_places}&prix=${this.currentEvent.prix}&libelle_sport=${this.currentEvent.libelle_sport}&libelle_lieu=${this.currentEvent.libelle_lieu}`)
        if (this.alertCountDown > 0) this.alertCountDown = 0;
        setTimeout(() => {
          this.showAlert(`Vous avez modifié la course "${this.currentEvent.title}"`, "success");
          window.scrollTo(0,0);
          this.resetCurrentCourse()
        }, "200")
        this.$refs['modal-edit-course'].hide()
      } catch (e) {
        console.warn("error modifyCourse", e)
        if (this.alertCountDown > 0) this.alertCountDown = 0;
        setTimeout(() => {
          this.showAlert(`Erreur pendant la modification de la course "${this.currentEvent.title}"`, "danger");
          window.scrollTo(0,0);
        }, "200")
        this.$refs['modal-edit-course'].hide()
      }
    },
    resetCurrentCourse(){
      this.currentEvent.id_course = -1
      this.currentEvent.title= ""
      this.currentEvent.nb_places= 0
      this.currentEvent.nb_km= 0
      this.currentEvent.prix= 0
      this.currentEvent.libelle_sport= ""
      this.currentEvent.libelle_lieu= ""
    },
    addCourse(){
      try {
        let response = axios.post(`http://localhost:3000/competitions?libelle=${this.currentEvent.title}&km=${this.currentEvent.nb_km}&places=${this.currentEvent.nb_places}&prix=${this.currentEvent.prix}&libelle_sport=${this.currentEvent.libelle_sport}&libelle_lieu=${this.currentEvent.libelle_lieu}`)
        if (this.alertCountDown > 0) this.alertCountDown = 0;
        this.getCompetitions()
        setTimeout(() => {
          this.showAlert(`Vous avez ajouté la course "${this.currentEvent.title}"`, "success");
          window.scrollTo(0,0);
          this.resetCurrentCourse()
        }, "1000")
        this.$refs['modal-edit-course'].hide()
      } catch (e) {
        console.warn("error modifyCourse", e)
        if (this.alertCountDown > 0) this.alertCountDown = 0;
        setTimeout(() => {
          this.showAlert(`Erreur pendant l'ajout de la course`, "danger");
          window.scrollTo(0,0);
        }, "200")
        this.$refs['modal-edit-course'].hide()
      }
    }
  },
  async created() {
    await this.getCompetitions()
    this.getSports()
  }
}
</script>

<style scoped>
@import '../../../../public/css/prestataires/prestataires/prestatairePresentationComponent.css';
</style>