<template>
  <div :style="layoutHeight">
    <FullCalendar
        :options="calendarOptions">
    </FullCalendar>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'

import {mapGetters, mapState} from 'vuex'

export default {
  props: {
    calendarOptions: Object
  },
  components: {FullCalendar},
  computed:{
    ...mapState(['layoutHeight'])
  }
}
</script>

<style scoped>

</style>