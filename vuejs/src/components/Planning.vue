<template>
  <div style="margin-top: 70px;">
    <FullCalendar
        :options="calendarOptions">
    </FullCalendar>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'

import {mapGetters} from 'vuex'

export default {
  props: {
    calendarOptions: Object
  },
  components: {FullCalendar}
}
</script>

<style scoped>

</style>