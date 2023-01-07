<template>
  <span v-if="this.userInfos.admin == 'prestataire'">
    <Planning :calendarOptions=optionsPresta :id=id> </Planning>
  </span>
  <span v-else>
    <Planning :calendarOptions=optionsPublic :id=id> </Planning>
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
      id:3
    }
  },
  computed: {
    ...mapGetters(["getEvents"]),
    ...mapState(['userInfos'])
  },
  methods: {
    handleSelect(selectTime){
      console.log(selectTime)
      let title = prompt('Please enter a new title for your event')
      let isOverlap = this.optionsPresta.events.some(event => selectTime.start.toJSON() >= event.start && selectTime.end.toJSON() <= event.end)

      if(title !== null && title !== "" && !isOverlap) {
        this.$store.commit("addEvent", {
          id: this.id,
          title: title,
          start: selectTime.startStr,
          end: selectTime.endStr,
          allDay: selectTime.allDay
        })
        this.id++
        this.optionsPresta.events = this.getEvents
      }
      else{
        alert("Impossible de créer un évènement à cet endroit là")
      }
    },
    handleEventClick(clickInfo) {
      console.log(clickInfo)
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
        this.$store.commit("removeEvent", clickInfo)
        this.optionsPresta.events = this.getEvents
      }
    },
    handleEventClickPublic(clickInfo) {
      console.log(clickInfo)
      console.log(this.userInfos)
      if (this.userInfos.admin !== null) window.location.href = "http://localhost:8080/signup";
      else {
        if (confirm(`Voulez-vous vous inscrire à l'évènement '${clickInfo.event.title}' ?`)) {
          clickInfo.event.remove()
          this.$store.commit("removeEvent", clickInfo)
          this.optionsPublic.events = this.getEvents
        }
      }
    }
  }
}
</script>