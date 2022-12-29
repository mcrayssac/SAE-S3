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

import {mapGetters} from 'vuex'

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
          start: '2023-01-13', // start: '2023-08-15'
          end: '2023-01-15' //end: '2023-08-17'
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
        eventResize: this.handleUpdateEvent,
        eventDrop: this.handleUpdateEvent,
        events: this.$store.getters.getEvents,
        nowIndicator: true
      },
      id:3
    }
  },
  components: {FullCalendar},
  computed: {
    ...mapGetters(["getEvents"])
  },
  methods: {
    handleSelect(selectTime){
      console.log(selectTime)
      let title = prompt('Please enter a new title for your event')
      let isOverlap = this.calendarOptions.events.some(event => selectTime.start.toJSON() >= event.start && selectTime.end.toJSON() <= event.end)

      if(title !== null && title !== "" && !isOverlap) {
        this.$store.commit("addEvent", {
          id: this.id,
          title: title,
          start: selectTime.startStr,
          end: selectTime.endStr,
          allDay: selectTime.allDay
        })
        this.id++
        this.calendarOptions.events = this.getEvents
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
        this.calendarOptions.events = this.getEvents
      }
    },
    handleUpdateEvent(clickInfo){
      console.log(clickInfo)
      this.$store.commit('updateEvent', clickInfo)
      this.calendarOptions.events = this.getEvents
      console.log(this.getEvents)
    }
  }
}
</script>

<style scoped>

</style>