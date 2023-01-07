<template>
  <div style="margin-top: 70px;">
    <FullCalendar
        :options="calendarOptions">
    </FullCalendar>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'

import {mapGetters, mapState} from 'vuex'

export default {
  data: function() {
    return {
      calendarOptions: {
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
        eventClick: this.handleEventClick,
        events: this.$store.getters.getEvents,
        nowIndicator: true
      },
      id:3
    }
  },
  components: {FullCalendar},
  computed: {
    ...mapGetters(["getEvents"]),
    ...mapState(['userInfos'])
  },
  methods: {
    handleEventClick(clickInfo) {
      console.log(clickInfo)
      console.log(this.userInfos)
      if (this.userInfos.admin !== null)  window.location.href = "http://localhost:8080/signup";
      else {
        if (confirm(`Voulez-vous vous inscrire à l'évènement '${clickInfo.event.title}' ?`)) {
          clickInfo.event.remove()
          this.$store.commit("removeEvent", clickInfo)
          this.calendarOptions.events = this.getEvents
        }
      }
    }
  }
}
</script>

<style scoped>

</style>