<template>
  <b-container :style="layoutHeight" fluid>
    <section class="Alert">
      <b-alert :variant="alertVariant" :show="alertCountDown" @dismissed="alertCountDown=0" @dismiss-count-down="countDownChanged">
        <h4 :class="'text-'+alertVariant+' mt-3 mb-4'">{{alertMessage}}</h4>
        <b-progress :variant="alertVariant" :max="alertMax" :value="alertCountDown" height="4px"></b-progress>
      </b-alert>
    </section>
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

    <span v-else-if="this.userInfos.admin == 'organisateur'">
      <Planning :calendarOptions=optionsOrga> </Planning>

      <b-modal ref="modal-orga" hide-footer hide-backdrop hide-header-close no-fade no-stacking centered id="modal-presta"
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

          <b-form-group class="mx-5 my-3" label="Prestataire de l'évènement : " label-class="label"
                        data-aos="fade-left"
                        data-aos-anchor-placement="top-bottom"
                        data-aos-duration="800">
            <b-form-select v-model="currentEvent.idPrestataire">
              <b-form-select-option v-for="(presta, index) in listPrestas" :key="index" :value="presta.id_prestataire"> {{presta.nom_prestataire}} </b-form-select-option>
            </b-form-select>
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
                      data-aos-delay="400" @click="$refs['modal-orga'].hide()"
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
  </b-container>
</template>

<script>
import Planning from "@/components/Planning";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import {mapGetters, mapState, mapActions} from "vuex";
import axios from "axios";

export default {
  components: {Planning},
  data: function() {
    return {
      optionsPresta: {
        plugins: [TimeGridPlugin, InteractionPlugin],
        locale: "fr",
        headerToolbar: {
          left: '',
          center: 'title',
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
        events: this.$store.getters.getSceneEvents,
        nowIndicator: true,
        height: "740px",
      },
      optionsPublic: {
        plugins: [TimeGridPlugin, InteractionPlugin],
        locale: "fr",
        headerToolbar: {
          left: '',
          center: 'title',
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
        events: this.$store.getters.getSceneEvents,
        nowIndicator: true,
        height: "740px",
      },
      optionsOrga: {
        plugins: [TimeGridPlugin, InteractionPlugin],
        locale: "fr",
        headerToolbar: {
          left: '',
          center: 'title',
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
        editable: true, // mettre a false pour public et prestataire
        select: this.handleSelect,
        eventClick: this.handleEventClick,
        eventDrop: this.handleUpdate,
        eventResize: this.handleUpdate,
        events: this.$store.getters.getSceneEvents,
        nowIndicator: true,
        height: "740px",
      },
      currentEvent: {
          title: "",
          nbPlaces: null,
          idPrestataire: null
        },
      currentTime: null,
      currentPlacesLeft : null,
      listPrestas: [],
      alertMax: 20,
      alertCountDown: 0,
      alertMessage: null,
      alertVariant: null
    }
  },
  computed: {
    ...mapGetters(["getSceneEvents"]),
    ...mapState(['userInfos', "layoutHeight"]),
    ...mapActions(['setDemos'])
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.alertCountDown = dismissCountDown
    },
    getPrestas(){
      axios.get(`http://localhost:3000/demos/prestataires`)
          .then(response => {
            this.listPrestas = response.data
          })
          .catch(e => {
            console.log('err get getPrestas : ', e)
            this.listPrestas = []
          })
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
        if(this.userInfos.admin == "prestataire") this.$refs['modal-presta'].show()
        else if(this.userInfos.admin == "organisateur") this.$refs['modal-orga'].show()
      }
      else{
        this.alertMessage = `Impossible de créer un évènement à cet endroit là`;
        this.alertVariant = "danger";
        this.alertCountDown = this.alertMax
      }
    },
    handleEventClick(clickInfo) {
      console.log(clickInfo)
      let admin = this.userInfos.admin == "organisateur" ? true : false
      if (confirm(`Voulez-vous supprimer l'initiation '${clickInfo.event.title}' ?`)) {
        let length = this.$store.getters.getSceneEvents.length
        this.$store.commit("removeEvent", {
          id: parseInt(clickInfo.event.id),
          start: clickInfo.event.start,
          id_prestataire: this.userInfos.id,
          type: 'demos',
          admin: admin
        })
        if(length != this.$store.getters.getSceneEvents.length) {
          this.alertMessage = `Vous avez supprimé la démonstration "${clickInfo.event.title}"`;
          this.alertVariant = "success";
          this.alertCountDown = this.alertMax
          if(this.userInfos.admin == "organisateur") this.optionsOrga.events = this.$store.getters.getSceneEvents
          else if (this.userInfos.admin == "prestataire") this.optionsPresta.events = this.$store.getters.getSceneEvents
        }
        else{
          this.alertMessage = `Vous ne pouvez pas supprimer la démonstration "${clickInfo.event.title}"`;
          this.alertVariant = "danger";
          this.alertCountDown = this.alertMax
        }
      }
    },
    handleEventClickPublic(clickInfo) {
      console.log(clickInfo.event)
      if (this.userInfos.admin !== null) this.$router.push({name: 'signup'});
      else {
        this.currentEvent = clickInfo.event
        axios.get(`http://localhost:3000/demos/` + clickInfo.event.id + '/number-places-left')
            .then(response => this.currentPlacesLeft = response.data.data.nb_places - response.data.data.total_reserv)
            .catch(e => console.log('err get nbPlacesLeft : ', e))
        this.$refs['modal'].show()
      }
    },
    handleUpdate(clickInfo) {
      console.log(clickInfo)
      this.$store.commit("updateEvent", {
        id: parseInt(clickInfo.event.id),
        start: clickInfo.event.start,
        end: clickInfo.event.end
      })
      console.log("fini")
    },
    register(){
      console.log(this.currentEvent.start.getDate())
      if(this.currentEvent.title != "" && this.currentEvent.nbPlaces > 0 && this.currentEvent.nbPlaces < this.currentPlacesLeft) {
        this.$store.commit("registerToEvent", {
          id: parseInt(this.currentEvent.id),
          nbPlaces: parseInt(this.currentEvent.nbPlaces),
          id_public: this.userInfos.id,
          start: this.currentEvent.start,
          type: 'demos'
        })
        this.currentPlacesLeft = null
        this.$refs['modal'].hide()
        this.alertMessage = `Inscription réussie pour l'activité "${this.currentEvent.title}"`;
        this.alertVariant = "success";
        this.alertCountDown = this.alertMax
      }
      else{
        this.alertMessage = `Mauvaises informations saisies`;
        this.alertVariant = "danger";
        this.alertCountDown = this.alertMax
      }
    },
    async onSubmit(event) {
      console.log(event)
      if (this.currentEvent.title != "" && this.currentEvent.nbPlaces > 0) {
        if(this.userInfos.admin == "prestataire") {
          this.$store.commit("addEvent", {
            title: this.currentEvent.title,
            start: this.currentTime.start,
            end: this.currentTime.end,
            nbPlaces: parseInt(this.currentEvent.nbPlaces),
            id_prestataire: this.userInfos.id,
            type: 'demos'
          })
          this.optionsPresta.events = this.$store.getters.getSceneEvents
          this.$refs['modal-presta'].hide()
          this.alertMessage = `Evènement "${this.currentEvent.title}" ajouté, en attente de validation des organisateurs`;
          this.alertVariant = "success";
          this.alertCountDown = this.alertMax
        }
        else if(this.userInfos.admin == "organisateur"){
          await this.$store.commit("addOrgaEvent", {
            title: this.currentEvent.title,
            start: this.currentTime.start,
            end: this.currentTime.end,
            nbPlaces: parseInt(this.currentEvent.nbPlaces),
            id_prestataire: this.currentEvent.idPrestataire,
            type: 'demos'
          })
          console.log(event)
          this.optionsOrga.events = this.$store.getters.getSceneEvents
          this.$refs['modal-orga'].hide()
        }
      }
      else{
        this.alertMessage = `Mauvaises informations saisies`;
        this.alertVariant = "danger";
        this.alertCountDown = this.alertMax
      }
    }
  },
  async created(){
    setTimeout(async () => {
      await this.$store.dispatch('setDemos')
    }, "1000");
    this.getPrestas()
  }
}
</script>