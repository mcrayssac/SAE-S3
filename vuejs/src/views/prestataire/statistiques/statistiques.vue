<template>
  <b-container fluid :style="layoutHeight">
    <section class="Title">
      <b-row align-v="center" align-h="center">
        <b-col cols="auto">
          <h1 class="m-5">Vos statistiques : {{userInfos.name}}</h1>
        </b-col>
      </b-row>
    </section>

    <section v-if="chartOptions" class="Main">
      <section class="m-3 py-5 pe-5 ps-3 Clic">
        <b-row  align-h="center">
          <b-col cols="6">
            <b-row align-h="center">
              <b-col cols="auto">
                <span class="chart-title">Nombres de clics sur votre page</span>
              </b-col>
            </b-row>
            <hr class="m-3 hr-chart">
            <b-row class="m-2" align-h="start">
              <b-col cols="auto">
                <span class="label-chart">Axe des ordonnées : </span>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="auto">
                <span class="text-chart">Nombre de clics</span>
              </b-col>
            </b-row>
            <b-row class="m-2" align-h="start">
              <b-col cols="auto">
                <span class="label-chart">Axe des abscisses : </span>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="auto">
                <span class="text-chart">Jour mois et année</span>
              </b-col>
            </b-row>
            <b-row class="m-2" align-h="start">
              <b-col cols="auto">
                <span class="label-chart">Moyenne de clics : </span>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="auto">
                <span class="text-chart">...</span>
              </b-col>
            </b-row>
            <b-row class="m-2" align-h="start">
              <b-col cols="auto">
                <span class="label-chart">Peu de clics : </span>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="auto">
                <span class="text-chart">De 0 à ... </span>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="p-3 Chart" cols="6">
            <JSCharting :options="chartOptions"></JSCharting>
          </b-col>
        </b-row>
      </section>

    </section>

    <section v-else class="Loading">
      <app-loading color="#6ec8cb" />
    </section>
  </b-container>
</template>

<script>

import appLoading from "@/loading";
import {mapState} from "vuex";
import JSCharting from "jscharting-vue";

export default {
  name: "statistiques",
  components: {JSCharting, appLoading},
  data: function() {
    return {
      chartOptions: {
        type: 'area spline',
        legend_visible: false,
        defaultSeries: {
          shape_opacity: 0.3,
          color: '#6ec8cb',
          defaultPoint_marker: {
            type: 'linear/basic/magic-mouse',
            size: 15,
            outline: {color: 'white', width: 1.5}
          }
        },
        xAxis: {
          scale_type: 'date',
          crosshair_enabled: true,
        },
        yAxis: [
          {
            markers: [
              {
                value: [0, 32],
                label: {
                  text: '<icon name=linear/ecommerce/graph-decrease size=15 verticalAlign=center margin_right=4> Peu de clics',
                  style_fontSize: 14,
                  align: 'center'
                },
                color: ['#d9231a', 0.5]
              },
              {
                value: 72,
                label_text: '<icon name=linear/ecommerce/graph-increase size=15 verticalAlign=center margin_right=4> Moyenne de clics',
                label_style_fontSize: 13,
                line_width: 5,
                color: ['#495388', 0.5],
                label_align: 'left'
              }
            ]
          }
        ],
        series: [
          {
            name: 'Clicks',
            points: [
              ['1/1/2020', 29.9],
              ['1/2/2020', 71.5],
              ['1/3/2020', 106.4],
              ['1/6/2020', 129.2],
              ['1/7/2020', 144.0],
              ['1/8/2020', 176.0]
            ]
          }
        ]
      }
    }
  },
  computed:{
    ...mapState(['userInfos', 'layoutHeight'])
  },
  methods:{

  },
  updated() {
    if (this.userInfos.admin !== 'prestataire') window.location.href = "http://localhost:8080/";
  },
  created() {

  }
}
</script>

<style scoped>
@import '../../../../public/css/statistiques/statistiques.css';
</style>