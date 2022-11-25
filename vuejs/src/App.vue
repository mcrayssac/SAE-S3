<template>
  <div>
    <layout/>
    <router-view/>
  </div>
</template>

<script>
import layout from "@/views/layouts/mainHomeTest";
export default {
  name: "app",
  components: {layout}
}
</script>

<style>

</style>
