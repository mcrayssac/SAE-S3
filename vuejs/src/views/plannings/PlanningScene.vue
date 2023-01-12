<template>
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
        nowIndicator: true
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
        nowIndicator: true
      },
      currentEvent: {
          title: "",
          nbPlaces: null
        },
      currentTime: null,
      currentPlacesLeft : null
    }
  },
  computed: {
    ...mapGetters(["getSceneEvents"]),
    ...mapState(['userInfos']),
    ...mapActions(['setDemos'])
  },
  methods: {
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
        console.log(this.$refs['modal-presta'])
        this.$refs['modal-presta'].show()
      }
      else{
        alert("Impossible de créer un évènement à cet endroit là")
      }
    },
    handleEventClick(clickInfo) {
      console.log(clickInfo)
      if (confirm(`Voulez-vous supprimer l'initiation '${clickInfo.event.title}' ?`)) {
        let length = this.getSceneEvents.length
        this.$store.commit("removeSceneEvent", {
          id: parseInt(clickInfo.event.id),
          start: clickInfo.event.start,
          id_prestataire: this.userInfos.id
        })
        if(length != this.getSceneEvents.length) {
          clickInfo.event.remove()
          this.optionsPresta.events = this.getSceneEvents
        }
        else alert('Vous ne pouvez pas supprimer cet évènement')
      }
    },
    handleEventClickPublic(clickInfo) {
      console.log(clickInfo.event)
      if (this.userInfos.admin !== null) window.location.href = "http://localhost:8080/signup";
      else {
        this.currentEvent = clickInfo.event
        axios.get(`http://localhost:3000/demos/` + clickInfo.event.id + '/number-places-left')
            .then(response => this.currentPlacesLeft = response.data.data[0].nb_places - response.data.data[0].total_reserv)
            .catch(e => console.log('err get nbPlacesLeft : ', e))
        this.$refs['modal'].show()
      }
    },
    register(){
      console.log(this.currentEvent.start.getDate())
      if(this.currentEvent.title != "" && this.currentEvent.nbPlaces > 0 && this.currentEvent.nbPlaces < this.currentPlacesLeft) {
        this.$store.commit("registerToSceneEvent", {
          id: parseInt(this.currentEvent.id),
          nbPlaces: parseInt(this.currentEvent.nbPlaces),
          id_public: this.userInfos.id,
          start: this.currentEvent.start
        })
        this.currentPlacesLeft = null
        this.$refs['modal'].hide()
        alert("Inscription réussie")
      }
      else{
        alert("Mauvaises informations saisies")
      }
    },
    async onSubmit(event) {
      console.log(event)
      if(this.currentEvent.title != "" && this.currentEvent.nbPlaces > 0) {
        this.$store.commit("addSceneEvent", {
          title: this.currentEvent.title,
          start: this.currentTime.start,
          end: this.currentTime.end,
          nbPlaces: parseInt(this.currentEvent.nbPlaces),
          id_prestataire: this.userInfos.id
        })
        this.optionsPresta.events = this.getSceneEvents
        this.$refs['modal-presta'].hide()
        alert("Evènement ajouté, en attente de validation des organisateurs")
      }
      else{
        alert("Mauvaises informations saisies")
      }
    }
  },
  async created(){
    await this.$store.dispatch('setDemos')
  }
}
</script>