<template>
  <b-container fluid :style="$store.state.layoutHeight" class="background">
    <b-row align-h="center" align-v="center">
      <b-col cols="auto">
        <h1 class="m-5 etat-title"
            data-aos="fade-up-right"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="800">Etat inscription</h1>
      </b-col>
    </b-row>

    <b-row class="mt-3 mb-5" align-h="center" align-v="center">
      <b-col class="main-col py-3 px-4" cols="auto">
        <b-row class="m-3" align-h="center" align-v="center">
          <b-col cols="auto">
            <h5 class="text-white"
                data-aos="fade-left"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="800">Résumé de votre demande</h5>
          </b-col>
        </b-row>
        <b-progress class="my-2" :max="100" animated variant="success" height="2rem"
                    data-aos="flip-right"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-duration="800">
          <b-progress-bar :value="50">
            <span>Progression : <strong>50%</strong></span>
          </b-progress-bar>
        </b-progress>
        <section class="Name my-3">
          <b-row align-v="center">
            <b-col cols="auto"
                   data-aos="fade-right"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-duration="800">
              <span class="text-white etat-label"><b-icon icon="check2-square" scale="0.8"></b-icon> Nom de votre entreprise :</span>
            </b-col>
          </b-row>
          <b-row align-h="center" align-v="center">
            <b-col cols="auto"
                   data-aos="fade-left"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-duration="800">
              <span class="text-white etat-text">{{userInfos.name}}</span>
            </b-col>
          </b-row>
        </section>

        <section class="Email my-3">
          <b-row align-v="center">
            <b-col cols="auto"
                   data-aos="fade-right"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-delay="300"
                   data-aos-duration="800">
              <span class="text-white etat-label"><b-icon icon="check2-square" scale="0.8"></b-icon> Email de votre entreprise :</span>
            </b-col>
          </b-row>
          <b-row align-h="center" align-v="center">
            <b-col cols="auto"
                   data-aos="fade-left"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-delay="300"
                   data-aos-duration="800">
              <span class="text-white etat-text">{{userInfos.email}}</span>
            </b-col>
          </b-row>
        </section>

        <section class="Telephone my-3">
          <b-row align-v="center">
            <b-col cols="auto"
                   data-aos="fade-right"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-delay="600"
                   data-aos-duration="800">
              <span class="text-white etat-label"><b-icon icon="check2-square" scale="0.8"></b-icon> Téléphone de votre entreprise :</span>
            </b-col>
          </b-row>
          <b-row align-h="center" align-v="center">
            <b-col cols="auto"
                   data-aos="fade-left"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-delay="600"
                   data-aos-duration="800">
              <span class="text-white etat-text">{{userInfos.telephone}}</span>
            </b-col>
          </b-row>
        </section>

        <section class="Site my-3">
          <b-row align-v="center">
            <b-col cols="auto"
                   data-aos="fade-right"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-delay="900"
                   data-aos-duration="800">
              <span class="text-white etat-label"><b-icon icon="check2-square" scale="0.8"></b-icon> Site web de votre entreprise :</span>
            </b-col>
          </b-row>
          <b-row align-h="center" align-v="center">
            <b-col cols="auto"
                   data-aos="fade-left"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-delay="900"
                   data-aos-duration="800">
              <span class="text-white etat-text">{{userInfos.site}}</span>
            </b-col>
          </b-row>
        </section>

        <section class="Attente my-3">
          <b-row align-v="center">
            <b-col cols="auto"
                   data-aos="fade-right"
                   data-aos-anchor-placement="top-bottom"
                   data-aos-delay="1200"
                   data-aos-duration="800">
              <span class="text-white etat-label"><b-icon icon="check2-square" scale="0.8"></b-icon> Réponse de l'organisation :</span>
            </b-col>
          </b-row>
          <b-row align-h="center" align-v="center"
                 data-aos="fade-left"
                 data-aos-anchor-placement="top-bottom"
                 data-aos-delay="1200"
                 data-aos-duration="800">
            <b-col class="px-0" cols="auto">
              <b-spinner variant="light" small></b-spinner>
            </b-col>
            <b-col cols="auto">
              <span class="text-white etat-text">En attente...</span>
            </b-col>
          </b-row>
        </section>
      </b-col>
    </b-row>

    <b-row class="pt-5" align-h="start" align-v="center">
      <b-col cols="auto">
        <span class="etat-description">*Le temps d'attente avant la réponse de l'organisation n'est définie</span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "etatInscription",
  computed:{
    ...mapState(['userInfos'])
  },
  async updated() {
    if (this.$store.state.userInfos.etat === null || this.$store.state.userInfos.etat === undefined){
      window.location.href = "http://localhost:8080/";
    } else {
      if (this.$store.state.userInfos.etat) window.location.href = "http://localhost:8080/";
    }
  }
}
</script>

<style scoped>
@import '../../../public/css/etatInscription/etatInscription.css';
</style>