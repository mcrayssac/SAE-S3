<template>
  <b-container fluid :style="layoutHeight">
    <br>
    <section class="Alert">
      <b-alert :variant="alertVariant" :show="alertCountDown" @dismissed="alertCountDown=0"
               @dismiss-count-down="countDownChanged"
               data-aos="fade-down"
               data-aos-anchor-placement="top-bottom"
               data-aos-duration="800">
        <h4 :class="'text-'+alertVariant+' mt-3 mb-4'"
            data-aos="fade-down"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
            data-aos-duration="800">{{ alertMessage }}</h4>
        <b-progress :variant="alertVariant" :max="alertMax" :value="alertCountDown" height="4px"
                    data-aos="zoom-in"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="100"
                    data-aos-duration="800"></b-progress>
      </b-alert>
    </section>

    <section class="Title">
      <b-row align-v="center" align-h="center">
        <b-col cols="auto">
          <h1 class="m-5"
              data-aos="fade-up-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="800">Vos statistiques : {{userInfos.data.name}}</h1>
        </b-col>
      </b-row>
    </section>

    <section v-if="show" class="Main">
      <section class="m-3 py-5 pe-lg-5 ps-lg-3 pe-xl-5 ps-xl-3 px-md-5 px-sm-4 px-4 Clic">
        <b-row align-h="center">
          <b-col cols="12" lg="6">
            <b-row align-h="center">
              <b-col class="text-center" cols="auto" data-aos="fade-right"
                     data-aos-anchor-placement="top-bottom"
                     data-aos-duration="800">
                <span class="chart-title">Nombres de clics sur votre page</span>
              </b-col>
            </b-row>
            <hr class="m-3 hr-chart">
            <b-row class="m-2" align-h="start">
              <b-col cols="auto" data-aos="fade-left"
                     data-aos-anchor-placement="top-bottom"
                     :data-aos-delay="200"
                     data-aos-duration="800">
                <span class="label-chart">Axe des ordonnées : </span>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="auto" data-aos="fade-right"
                     data-aos-anchor-placement="top-bottom"
                     :data-aos-delay="400"
                     data-aos-duration="800">
                <span class="text-chart">Nombre de clics</span>
              </b-col>
            </b-row>
            <b-row class="m-2" align-h="start">
              <b-col cols="auto" data-aos="fade-left"
                     data-aos-anchor-placement="top-bottom"
                     :data-aos-delay="600"
                     data-aos-duration="800">
                <span class="label-chart">Axe des abscisses : </span>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="auto" data-aos="fade-right"
                     data-aos-anchor-placement="top-bottom"
                     :data-aos-delay="800"
                     data-aos-duration="800">
                <span class="text-chart">Jour mois et année</span>
              </b-col>
            </b-row>
            <b-row class="m-2" align-h="start">
              <b-col cols="auto" data-aos="fade-left"
                     data-aos-anchor-placement="top-bottom"
                     :data-aos-delay="1000"
                     data-aos-duration="800">
                <span class="label-chart">Moyenne de clics : </span>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="auto" data-aos="fade-right"
                     data-aos-anchor-placement="top-bottom"
                     :data-aos-delay="1200"
                     data-aos-duration="800">
                <span class="text-chart">{{ chartOptions.yAxis[0].markers[1].value }} clics</span>
              </b-col>
            </b-row>
            <b-row class="m-2" align-h="start">
              <b-col cols="auto" data-aos="fade-left"
                     data-aos-anchor-placement="top-bottom"
                     :data-aos-delay="1400"
                     data-aos-duration="800">
                <span class="label-chart">Peu de clics : </span>
              </b-col>
            </b-row>
            <b-row class="mb-4"  align-h="center">
              <b-col cols="auto" data-aos="fade-right"
                     data-aos-anchor-placement="top-bottom"
                     :data-aos-delay="1600"
                     data-aos-duration="800">
                <span class="text-chart">De {{
                    chartOptions.yAxis[0].markers[0].value[0]
                  }} à {{ chartOptions.yAxis[0].markers[0].value[1] }} clics</span>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="p-3 Chart" cols="12" lg="6">
            <JSCharting :options="chartOptions" ref="chart" data-aos="fade-up-left"
                        data-aos-anchor-placement="top-bottom"
                        :data-aos-delay="1800"
                        data-aos-duration="800" style="width: 100%; height: 100%;"></JSCharting>
          </b-col>
        </b-row>
      </section>

    </section>

    <section v-else class="Loading">
      <app-loading color="#6ec8cb"/>
    </section>

    <b-button class="update-button" @click="addSeries" v-b-tooltip.hover.right
              title="Cliquez ici pour afficher/Mettre à jour les statistiques"
              data-aos="fade-up-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="800">
      <b-icon animation="spin" icon="arrow-repeat" scale="2"></b-icon>
    </b-button>
  </b-container>
</template>

<script>

import appLoading from "@/loading";
import {mapState} from "vuex";
import JSCharting from "jscharting-vue";
import axios from "axios";

export default {
  name: "statistiques",
  components: {JSCharting, appLoading},
  data: () => ({
    show: false,
    data: null,
    delayAos: 300,
    alertMax: 20,
    alertCountDown: 20,
    alertMessage: 'Veuillez cliquer sur le bouton du bas afin d\'afficher les statistiques',
    alertVariant: 'info',
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
        defaultTick: {
          label_rotate: -30
        }
      },
      yAxis: [
        {
          scale_type: 'auto',
          markers: [
            {
              value: [0, 0],
              label: {
                text: '<icon name=linear/ecommerce/graph-decrease size=15 verticalAlign=center margin_right=4> Peu de clics',
                style_fontSize: 14,
                align: 'center'
              },
              color: ['#d9231a', 0.5]
            },
            {
              value: 0,
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
          name: 'Clics',
          points: []
        }
      ]
    }
  }),
  computed: {
    ...mapState(['userInfos', 'layoutHeight'])
  },
  methods: {
    addSeries: async function () {
      let self = this;
      await axios.get(`http://localhost:3000/statistiques/prestataire/clics/${this.userInfos.data.id}`)
          .then(result => {
            if (result.data.data){
              self.chartOptions.series[0].points = result.data.data.temp;
              self.chartOptions.yAxis[0].markers[1].value = result.data.data.sum;
              self.chartOptions.yAxis[0].markers[0].value = result.data.data.down;
              if (!self.show) self.show = true;
              if (self.alertCountDown > 0) self.alertCountDown = 0;
            } else {
              let message = `Vous n'avez pas de statistiques disponible pour le moment`;
              let variant = `warning`;
              if (self.alertCountDown > 0) self.alertCountDown = 0;
              setTimeout(() => {
                this.showAlert(message, variant);
              }, "50")
            }
          })
          .catch((err) => {
            let message = `ERREUR lors de l'affichage des statistiques, merci de réessayer !`;
            let variant = `danger`;
            if (self.alertCountDown > 0) self.alertCountDown = 0;
            setTimeout(() => {
              this.showAlert(message, variant);
            }, "50")
          });
    },
    countDownChanged(dismissCountDown) {
      this.alertCountDown = dismissCountDown;
    },
    showAlert(message, variant) {
      this.alertMessage = message;
      this.alertVariant = variant;
      this.alertCountDown = this.alertMax;
    },
  },
  updated() {
    setTimeout(() => {
      if (!this.userInfos.data || this.userInfos.data.admin !== 'prestataire') this.$router.push({name: 'home'});
    }, "100")
  }
}
</script>

<style scoped>
@import '../../../../public/css/statistiques/statistiques.css';
</style>