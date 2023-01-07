<template>
  <span v-if="this.userInfos.admin == 'prestataire'">
    <Planning :calendarOptions=optionsPresta :id=id> </Planning>

    <b-modal ref="modal-presta" hide-footer hide-backdrop hide-header-close no-fade no-stacking centered id="modal-presta"
             title="Ajouter une nouvelle initiation">
      <b-form>
        <b-form-group class="mx-5 my-3" label="Nom de l'initiation : " label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="800">
          <b-form-input v-model="currentEvent.event.title" type="text" required></b-form-input>
        </b-form-group>

        <b-form-group class="mx-5 my-3" label="Nombre de places : " label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="800">
          <b-form-input v-model="currentEvent.event.nbPlaces" type="number" required></b-form-input>
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
    <Planning :calendarOptions=optionsPublic :id=id> </Planning>

    <b-modal ref="modal" hide-footer hide-backdrop hide-header-close no-fade no-stacking centered id="modal"
             :title=currentEvent.event.title>
      <h5> Nombres de places restantes </h5> <br>
        5
      <hr>
      <br>
      <b-form>
        <b-form-group class="mx-5 my-3" label="Nombre de places : " label-class="label"
                      data-aos="fade-left"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="800">
          <b-form-input v-model="currentEvent.event.nbPlaces" type="number" required></b-form-input>
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
import {mapGetters, mapState} from "vuex";

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
        events: this.$store.getters.getEvents,
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
        events: this.$store.getters.getEvents,
        nowIndicator: true
      },
      id:3,
      currentEvent: {
        event: {
          title: "",
          nbPlaces: null
        }
      },
      currentTime: null,
      max: 10
    }
  },
  computed: {
    ...mapGetters(["getEvents"]),
    ...mapState(['userInfos'])
  },
  methods: {
    hideModal(){
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
        alert("Impossible de créer un évènement à cet endroit là")
      }
    },
    handleEventClick(clickInfo) {
      console.log(clickInfo)
      if (confirm(`Voulez-vous supprimer l'initiation '${clickInfo.event.title}' ?`)) {
        clickInfo.event.remove()
        this.$store.commit("removeEvent", clickInfo)
        this.optionsPresta.events = this.getEvents
      }
    },
    handleEventClickPublic(clickInfo) {
      console.log(clickInfo)
      if (this.userInfos.admin !== null) window.location.href = "http://localhost:8080/signup";
      else {
        this.currentEvent = clickInfo
        this.$refs['modal'].show()
      }
    },
    register(){
      console.log(this.userInfos.id)
      if(this.currentEvent.event.title != "" && this.currentEvent.event.nbPlaces > 0 && this.currentEvent.event.nbPlaces < this.max) {
        this.$store.commit("addEvent", {
          id: this.id,
          title: this.currentEvent.event.title,
          start: this.currentTime.startStr,
          end: this.currentTime.endStr,
          allDay: this.currentTime.allDay,
          nbPlaces: this.currentEvent.event.nbPlaces
        })
        this.id++
        this.optionsPublic.events = this.getEvents
        this.$refs['modal'].hide()
      }
      else{
        alert("Mauvaises informations saisies")
      }
      this.$refs['modal'].hide()
    },
    async onSubmit(event) {
      console.log(event)
      if(this.currentEvent.event.title != "" && this.currentEvent.event.nbPlaces > 0) {
        this.$store.commit("addEvent", {
          id: this.id,
          title: this.currentEvent.event.title,
          start: this.currentTime.startStr,
          end: this.currentTime.endStr,
          allDay: this.currentTime.allDay,
          nbPlaces: this.currentEvent.event.nbPlaces
        })
        this.id++
        this.optionsPresta.events = this.getEvents
        this.$refs['modal-presta'].hide()
      }
      else{
        alert("Mauvaises informations saisies")
      }
    }
  }
}
</script>