<template>
  <b-container fluid :style="layoutHeight">
    <section v-if="!data" class="Loading">
      <app-loading/>
    </section>
    <section v-else class="Main">
      <section class="Alert">
        <b-alert :variant="alertVariant" :show="alertCountDown" @dismissed="alertCountDown=0" @dismiss-count-down="countDownChanged">
          <h4 :class="'text-'+alertVariant+' mt-3 mb-4'">{{alertMessage}}</h4>
          <b-progress :variant="alertVariant" :max="alertMax" :value="alertCountDown" height="4px"></b-progress>
        </b-alert>
      </section>
      <section class="Title">
        <b-row align-h="center">
          <b-col class="mt-5 ms-5 me-5" cols="1">
          </b-col>
          <b-col class="mt-5 ms-5 me-5" cols="8">
            <h1 data-aos="zoom-in-down"
                data-aos-delay="200"
                data-aos-duration="500"
                data-aos-anchor-placement="top-center">
              <b-link href="https://www.jdadijon.com/basket/">
                <b-img alt="Logo club" :src="data.url_image" width="150"></b-img>
              </b-link>
              {{data.nom_prestataire}}
            </h1>
          </b-col>
          <b-col class="mt-5 ms-5 me-5" cols="1" style="background-color: #1a265a;">
            <h4 style="color: white; padding-top: 20px;">Affluence</h4>
            <section v-if="userInfos.admin == 'prestataire' && this.userInfos.id == this.data.id_prestataire">
              <b-form-select v-model="affluence" :options="['Faible', 'Moyenne', 'Elevée']" v-on:change="setAffluence" style="width: 100%; margin-top: 5px"></b-form-select>
            </section>
            <section v-else>
              <svg viewBox="0 0 4 2.5" :style="colorAffluence">
                <circle cx="2" cy="1" r="0.8"/>
              </svg>
            </section>
          </b-col>
        </b-row>
      </section>

      <section class="Description">
        <b-row class="me-2 ms-2 mt-5 mb-5">
          <b-col class="ml-3" style="background-color: #1a265a;">
            <b-row class="m-4" align-h="center">
              <b-col cols="auto">
                <h1 data-aos="fade-right"
                    data-aos-delay="400"
                    data-aos-duration="500"
                    data-aos-anchor-placement="top-center" style="color: white;">A PROPOS</h1>
              </b-col>
            </b-row>
<!--            <b-row class="mx-4 mb-5" v-for="(items, index) in data[0].texte" :key="index">-->
              <p data-aos="fade-left"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" style="text-indent: 40px; color: white; text-align: justify;">{{ data.text_gauche }}</p>
<!--            </b-row>-->
          </b-col>
          <b-col class="my-auto mr-3">
            <b-row class="mx-5 my-5" align-h="center">
              <b-col data-aos="flip-up"
                     data-aos-delay="400"
                     data-aos-duration="500"
                     data-aos-anchor-placement="top-bottom" cols="auto">
                <a><b-img :src="data.url_image" width="300" height="300" style="border-radius: 50%;"></b-img></a>
              </b-col>
            </b-row>
            <b-row data-aos="zoom-in-up"
                   data-aos-delay="400"
                   data-aos-duration="500"
                   data-aos-anchor-placement="top-bottom" class="mx-4 my-5">
              <p style="color: black; font-weight: bold;text-align: justify;">
                {{data.text_droite}}
              </p>
            </b-row>
          </b-col>
        </b-row>
      </section>

      <hr class="m-5 ligne">

      <section class="Initiation/Activites">
        <b-row align-h="center">
          <b-col data-aos="zoom-in-left"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <h2 class="my-4">Initiation/Activités</h2>
          </b-col>
        </b-row>

        <b-row align-h="center">
          <b-col data-aos="fade-right"
                 data-aos-delay="300"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <a><!--{{data.Initiation}}--></a>
          </b-col>
        </b-row>
      </section>

      <hr class="m-5 ligne">

      <section class="Calendrier">
        <b-row align-h="center">
          <b-col data-aos="zoom-in-right"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <h2 class="my-4">Calendrier sur le stand</h2>
          </b-col>
        </b-row>

        <b-row align-h="center">
          <span v-if="this.userInfos.admin == 'prestataire'">
            <Planning :calendarOptions=optionsPresta> </Planning>
            <b-modal ref="modal-presta" hide-footer hide-backdrop hide-header-close no-fade no-stacking centered id="modal-presta"
                             title="Ajouter une nouvelle initiation">
              <b-form>
                <b-form-group class="mx-5 my-3" label="Nom de l'initiation : " label-class="label"
                              data-aos="fade-left"
                              data-aos-anchor-placement="top-bottom"
                              data-aos-duration="800">
                  <b-form-input v-model="currentEvent.title" type="text" required></b-form-input>
                </b-form-group>

                <b-form-group class="mx-5 my-3" label="Nombre de places : " label-class="label"
                              data-aos="fade-left"
                              data-aos-anchor-placement="top-bottom"
                              data-aos-duration="800">
                  <b-form-input v-model="currentEvent.nbPlaces" type="number" required></b-form-input>
                </b-form-group>
              </b-form>

              <b-row class="m-5" align-h="center" align-v="center">
                <b-col cols="auto">
                  <b-button class="mx-2 button-submit" @click="onSubmit"
                            data-aos="flip-left" variant="outline-success"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration="400">Ajouter</b-button>
                  <b-button class="mx-2 button-decline"
                            data-aos="flip-right" variant="outline-secondary"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-delay="400" @click="hideModalPresta"
                            data-aos-duration="400">Fermer</b-button>
                </b-col>
              </b-row>
            </b-modal>
          </span>

          <span v-else>
            <Planning :calendarOptions=optionsPublic> </Planning>
            <b-modal ref="modal" hide-footer hide-backdrop hide-header-close no-fade no-stacking centered id="modal"
                             :title=currentEvent.title>
              <h5> Nombres de places restantes </h5> <br>
                {{this.currentPlacesLeft}}
              <hr>
              <br>
              <b-form>
                <b-form-group class="mx-5 my-3" label="Nombre de places : " label-class="label"
                              data-aos="fade-left"
                              data-aos-anchor-placement="top-bottom"
                              data-aos-duration="800">
                  <b-form-input v-model="currentEvent.nbPlaces" type="number" required></b-form-input>
                </b-form-group>
              </b-form>

              <b-row class="m-5" align-h="center" align-v="center">
                <b-col cols="auto">
                  <b-button class="mx-2 button-submit" @click="register"
                            data-aos="flip-left" variant="outline-success"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration="400">S'inscrire</b-button>
                  <b-button class="mx-2 button-decline"
                            data-aos="flip-right" variant="outline-secondary"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-delay="400" @click="hideModal"
                            data-aos-duration="400">Fermer</b-button>
                </b-col>
              </b-row>

            </b-modal>
          </span>
        </b-row>
      </section>

      <hr class="m-5 ligne">

      <section class="Commentaire">
        <b-row align-h="center" align-v="center">
          <b-col data-aos="zoom-in-down"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <h2 class="my-5">Commentaires</h2>
          </b-col>
        </b-row>

        <div class="row me-4">
          <div data-aos="flip-right"
               data-aos-delay="200"
               data-aos-duration="500"
               data-aos-anchor-placement="top-bottom" class="col-md-4 py-4 ps-5" v-for="(items, index) in commentaires" :key="index">
            <div class="card shadow-sm">
              <div class="card-body">
                <h3 class="card-title">{{items.nom_public}}</h3>
                <p class="card-text"><b> Commentaire : {{items.libelle_commentaire}}</b></p>
                <p class="text-right red"> {{items.libelle_note}}/10</p>
              </div>
            </div>
          </div>
        </div>

        <b-row align-h="center" align-v="center">
          <b-col v-if="peutCommenter" data-aos="zoom-in-down"
                 data-aos-delay="200"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-bottom" cols="auto">
            <button class="button-submit p-2 text-white my-5" @click="peutPoster">Ajouter un commentaire</button>
          </b-col>
          <b-row align-v="center" align-h="center" v-if="printFormulaire">
            <b-col cols="12">
              <b-form-group class="mx-5 my-3" label="Saisissez votre commentaire :"
                            label-class="label">
                <b-form-input class="button-submit p-2 text-white" v-model="form.commentaire" type="text" placeholder="Entrer votre commentaire..." required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group class="mx-5 my-3" label="Saisissez votre note :"
                            label-class="label">
                <b-form-input class="button-submit p-2 text-white" v-model="form.note" placeholder="Entrer votre note..." type="number" min="0" max="10" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" class="text-center">
              <button class="button-submit p-2 text-white my-5" @click="ajouterCommentaire()" style="width: 150px">Poster</button>
            </b-col>
          </b-row>
        </b-row>
      </section>
    </section>
  </b-container>
</template>

<script>
import axios from "axios";
import appLoading from "@/loading.vue"
import Planning from "@/components/Planning";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import {mapActions, mapGetters, mapState} from "vuex";
import resultats from "@/views/public/resultats/resultats";

export default {
  name: "prestataire",
  components: {appLoading, Planning},
  data: function() {
    return {
      layoutHeight: "margin-top : " + 59 + "px",
      data: null,
      commentaires: null,
      postCom: null,
      printFormulaire: false,
      affluence: null,
      colorAffluence: null,
      form: {
        commentaire: null,
        id: null,
        idPresta: null,
        note: null,
        surname: null
      },
      optionsPresta: {
        plugins: [TimeGridPlugin, InteractionPlugin],
        locale: "fr",
        headerToolbar: {
          left: '',
          center: '',
          right: ''
        },
        initialView: 'timeGridTwoDay',
        validRange: {
          start: '2023-08-15',
          end: '2023-08-17'
        },
        views: {
          timeGridTwoDay: {
            type: 'timeGrid',
            duration: {days: 2}
          }
        },
        slotMinTime: "08:00:00",
        slotMaxTime: "20:00:00",
        selectable: true,
        eventOverlap: false,
        editable: false, // mettre a false pour public et prestataire
        select: this.handleSelect,
        eventClick: this.handleEventClick,
        events: this.$store.getters.getInitiationsEvents,
        nowIndicator: true,
        height: "740px",
      },
      optionsPublic: {
        plugins: [TimeGridPlugin, InteractionPlugin],
        locale: "fr",
        headerToolbar: {
          left: '',
          center: '',
          right: ''
        },
        initialView: 'timeGridTwoDay',
        validRange: {
          start: '2023-08-15',
          end: '2023-08-17'
        },
        views: {
          timeGridTwoDay: {
            type: 'timeGrid',
            duration: {days: 2}
          }
        },
        slotMinTime: "08:00:00",
        slotMaxTime: "20:00:00",
        selectable: true,
        eventOverlap: false,
        editable: false,
        eventClick: this.handleEventClickPublic,
        events: this.$store.getters.getInitiationsEvents,
        nowIndicator: true,
        height: "740px",
      },
      currentEvent: {
        title: "",
        nbPlaces: null
      },
      currentTime: null,
      currentPlacesLeft : null,
      alertMax: 20,
      alertCountDown: 0,
      alertMessage: null,
      alertVariant: null
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.alertCountDown = dismissCountDown
    },
    setAffluence(){
      let id = -1
      switch (this.affluence) {
        case "Faible": id = 1; break;
        case "Moyenne": id = 2; break;
        case "Elevée": id = 3; break;
      }
      axios.put(`http://localhost:3000/affluence/${this.data.id_prestataire}?idAffluence=${id}`)
          .then(res => console.log(res.data.data))
          .catch(err => console.warn(err));
    },
    peutPoster() {
      if (this.userInfos.id !== -1) {
        axios.get(`http://localhost:3000/prestataires/commentairesDejaPoste/${this.data.id_prestataire}/${this.userInfos.id}`)
            .then(result => {
              if (result.data == "") {
                this.form.id = this.userInfos.id;
                this.form.idPresta = this.data.id_prestataire;
                this.postCom = true;
                this.printFormulaire = true
              }
            })
            .catch((err) => {
              let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
              console.warn("error", message);
            });
      }
      else {
        this.alertMessage = `Connectez-vous pour poster un commentaire !`;
        this.alertVariant = "warning";
        this.alertCountDown = this.alertMax
        window.scrollTo(0,0);
      }
    },
    ajouterCommentaire() {
      let self = this;
      if(this.form.note<=10 && this.form.note>=0) {
        axios.post(`http://localhost:3000/prestataires/${this.$route.params.nomPrestataire}/post_commentaire`, this.form)
            .then(result => {
              self.commentaires.push(result.data.data);
              self.postCom = false;
              self.printFormulaire = false;
            })
            .catch((err) => {
              let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
              console.warn("error", message);
            });
      }
      else{
        this.alertMessage = `Mauvaise information saisie (la note doit être comprise entre 0 et 10)`;
        this.alertVariant = "danger";
        this.alertCountDown = this.alertMax
        window.scrollTo(0,0);
      }
    },
    hideModal(){
      this.currentPlacesLeft = null
      this.$refs['modal'].hide()
    },
    hideModalPresta(){
      this.$refs['modal-presta'].hide()
    },
    handleSelect(selectTime){
      console.log(selectTime)
      let isOverlap = this.optionsPresta.events.some(event => selectTime.start.toJSON() >= event.start && selectTime.end.toJSON() <= event.end)

      if(!isOverlap) {
        this.currentTime = selectTime
        this.$refs['modal-presta'].show()
      }
      else{
        this.alertMessage = `Impossible de créer un évènement à cet endroit là`;
        this.alertVariant = "danger";
        this.alertCountDown = this.alertMax
        window.scrollTo(0,0);
      }
    },
    handleEventClick(clickInfo) {
      console.log(clickInfo)
      if (confirm(`Voulez-vous supprimer l'initiation '${clickInfo.event.title}' ?`)) {
        let length = this.$store.getters.getInitiationsEvents.length
        this.$store.commit("removeEvent", {
          id: parseInt(clickInfo.event.id),
          start: clickInfo.event.start,
          id_prestataire: this.userInfos.id,
          type: 'initiations'
        })
        if(length != this.$store.getters.getInitiationsEvents.length) {
          clickInfo.event.remove()
          this.optionsPresta.events = this.$store.getters.getInitiationsEvents
        }
        else {
          this.alertMessage = `Vous ne pouvez pas supprimer cet évènement`;
          this.alertVariant = "danger";
          this.alertCountDown = this.alertMax
          window.scrollTo(0, 0);
        }
      }
    },
    handleEventClickPublic(clickInfo) {
      console.log(clickInfo.event)
      if (this.userInfos.admin !== null) this.$router.push({name: 'signup'});
      else {
        this.currentEvent = clickInfo.event
        axios.get(`http://localhost:3000/initiations/` + clickInfo.event.id + '/number-places-left')
            .then(response => {
              this.currentPlacesLeft = response.data.data.nb_places - response.data.data.total_reserv
            })
            .catch(e => console.warn('err get nbPlacesLeft : ', e))
        this.$refs['modal'].show()
      }
    },
    register(){
      console.log(this.currentEvent.start.getDate())
      if(this.currentEvent.title != "" && this.currentEvent.nbPlaces > 0 && this.currentEvent.nbPlaces < this.currentPlacesLeft) {
        this.$store.commit("registerToEvent", {
          id: parseInt(this.currentEvent.id),
          nbPlaces: parseInt(this.currentEvent.nbPlaces),
          id_public: this.userInfos.id,
          start: this.currentEvent.start,
          type: 'initiations'
        })
        this.currentPlacesLeft = null
        this.$refs['modal'].hide()
        this.alertMessage = `Inscription réussie à l'évènement ${this.currentEvent.title}`;
        this.alertVariant = "success";
        this.alertCountDown = this.alertMax
        window.scrollTo(0,0);
      }
      else{
        this.alertMessage = `Inscription annulée, mauvaises informations saisies`;
        this.alertVariant = "danger";
        this.alertCountDown = this.alertMax
        window.scrollTo(0,0);
      }
    },
    async onSubmit(event) {
      console.log(event)
      if(this.currentEvent.title != "" && this.currentEvent.nbPlaces > 0) {
        this.$store.commit("addEvent", {
          title: this.currentEvent.title,
          start: this.currentTime.start,
          end: this.currentTime.end,
          nbPlaces: parseInt(this.currentEvent.nbPlaces),
          id_prestataire: this.userInfos.id,
          type: 'initiations'
        })
        this.optionsPresta.events = this.$store.getters.getInitiationsEvents
        this.$refs['modal-presta'].hide()
        this.alertMessage = `Evènement ${this.currentEvent.title} ajouté, en attente de validation des organisateurs`;
        this.alertVariant = "success";
        this.alertCountDown = this.alertMax
        window.scrollTo(0,0);
      }
      else{
        this.alertMessage = `Ajout de l'évènement annulé, mauvaises informations saisies`;
        this.alertVariant = "danger";
        this.alertCountDown = this.alertMax
        window.scrollTo(0,0);
      }
    }
  },
  computed: {
    ...mapGetters(["getInitiationsEvents"]),
    ...mapState(['userInfos']),
    peutCommenter(){
      if(!this.postCom || this.userInfos.admin==="prestataire"){
        return false
      }
      else if(this.userInfos.id==-1) return true;
      else{
        return true;
      }
    }
  },
  async created() {
    let self = this;
    if(Object.prototype.hasOwnProperty.call(this.userInfos, "data")){
      this.$store.commit("userInfos", this.userInfos.data)
    }
    await axios.get(`http://localhost:3000/prestataires/prestataire/${this.$route.params.nomPrestataire}`)
        .then(async (result) => {
          self.data = result.data.data;
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
    axios.get(`http://localhost:3000/affluence/${this.data.id_prestataire}`)
        .then(res => {
            this.affluence = res.data.data.libelle_affluence
            switch (this.affluence) {
              case "Faible": this.colorAffluence = "fill: green"; break;
              case "Moyenne": this.colorAffluence = "fill: orange"; break;
              case "Elevée": this.colorAffluence = "fill: red"; break;
            }
        })
        .catch(err => console.warn(err))
    axios.get(`http://localhost:3000/prestataires/prestataire/getCommentaires/${this.data.id_prestataire}`)
        .then (com => {
          this.commentaires = com.data.data
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });
    this.form.surname = this.userInfos.surname
    axios.get(`http://localhost:3000/prestataires/commentairesDejaPoste/${this.data.id_prestataire}/${this.userInfos.id}`)
        .then(result => {
          if (result.data == "" && this.userInfos.admin != "prestataire") {
            this.form.id = this.userInfos.id;
            this.form.idPresta = this.data.id_prestataire;
            this.postCom = true;
          } else {
            this.postCom = false;
          }
        })
        .catch((err) => {
          let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
          console.warn("error", message);
        });

    setTimeout(async () => {
      await this.$store.dispatch('setInitiations', this.data.id_prestataire)
    }, "1000");
  }
}
</script>

<style scoped>
@import '../../../../public/css/prestataire/prestataire.css';
</style>