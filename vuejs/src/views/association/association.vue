<template>
  <div>
  <app-assos-slide :slide="images"/>
  <b-container fluid>
    <section class="ScrollBar">
      <b-row align-h="center" style="background-color: #495388;">
        <b-col class="my-4" cols="auto">
          <h2 style="color: white">
            <b-icon icon="arrow-down" animation="cylon-vertical"></b-icon>
            Scroll down
            <b-icon icon="arrow-down" animation="cylon-vertical"></b-icon>
          </h2>
        </b-col>
      </b-row>
    </section>
  </b-container>
  <b-container class="container" :style="layoutHeight"><br><br>
    <b-row class="row paragraphe">
      <a><h2 class="my-3"
             data-aos="zoom-in-right"
             data-aos-duration="800"
             data-aos-anchor-placement="center-bottom">APF FRANCE HANDICAP</h2>
        <b-col class="justified-text-center my-5"
               cols="auto" data-aos="zoom-in-left"
               data-aos-duration="800"
               data-aos-anchor-placement="center-bottom">
          <p>APF France handicap (connue jusqu'en 2018 sous le nom d'Association des paralysés de France) a été créée en
            1933 par quatre jeunes atteints de poliomyélite : <strong><i>André Trannoy, Jacques Dubuisson, Jeanne Henry et
              Clothilde Lamborot.</i></strong>
            Révoltés par l'exclusion dont ils étaient victimes et souhaitant rompre l'isolement des personnes en
            situation de handicap, ils créent l'association en avril 1933.
          </p>
        </b-col>
        <br><br>
        <section class="vh-10" style="background-color: #495388; zoom: 80%">
          <div class="container py-5 h-100">
            <b-row class="row d-flex justify-content-center align-items-center h-100">
              <div class="col col-lg-10 col-xl-8">
                <div class="card rounded-3">
                  <div class="card-body p-5">
                    <div class="d-flex justify-content-center mb-4">
                      <img data-aos="flip-left"
                           data-aos-duration="800"
                           data-aos-anchor-placement="center-bottom"
                          src="https://www.apf-francehandicap.org/sites/default/files/styles/testimony_widget/public/a_trannoy_copier.jpg?itok=eLAtiMj8p"
                          class="rounded-circle shadow-1-strong" width="100" height="100" style="zoom: 70%"/>
                    </div>
                    <figure class="text-center mb-0">
                      <blockquote class="blockquote mb-4" data-aos="zoom-in-up"
                                  data-aos-duration="800"
                                  data-aos-anchor-placement="center-bottom">
                        <p>
                          <span class="font-italic">Je souhaite que ceux qui viennent et viendront auprès d'APF France handicap trouvent toujours auprès d'elle cet « autre chose » qui est l'essentiel.</span>
                        </p>
                      </blockquote>
                      <figcaption class="blockquote-footer mb-0" data-aos="fade-left"
                                  data-aos-delay="300"
                                  data-aos-duration="800"
                                  data-aos-anchor-placement="center-bottom">
                        ANDRÉ TRANNOY, <cite title="Source Title">FONDATEUR DE L'ASSOCIATION</cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </b-row>
          </div>
        </section>
        <br>
        <b-col class="justified-text-center my-5"
               cols="auto" >
              <span> <p data-aos="fade-left"
                        data-aos-duration="800"
                        data-aos-anchor-placement="center-bottom">Au fil des années, APF France handicap se développe :</p>
                  <br><br>
              <div id="containerIntro" data-aos="fade-right"
                   data-aos-duration="800"
                   data-aos-anchor-placement="center-bottom">
                  <h3 style="color:#6ec8cb" >ELLE CREE</h3> <p>des établissements et services de soins,</p>
                  <br><br>
                  <h3 style="color:#df1b3f">ELLE S'ENGAGE</h3><p> pour faire évoluer la législation en matière de handicap <br>et fédère de plus en plus de personnes en situation de handicap,<br> mobilisées pour défendre leurs droits.</p>
              </div>
                  <br><p data-aos="fade-left"
                         data-aos-duration="800"
                         data-aos-anchor-placement="center-bottom">
                  La devise d'André Trannoy <i>« risquer l’impossible » </i>reste aujourd'hui d'actualité :
                  <br>plus de 93 000 acteurs sont mobilisés au quotidien pour faire vivre cet engagement et construire une société solidaire ouverte à tous.
                    </p>
              </span>
        </b-col>
      </a>
    </b-row>
    <b-row class="m-5 ligne"></b-row>
    <b-container>
      <b-row class="row paragraphe">
        <a><h2 class="my-3" data-aos="zoom-in-right"
               data-aos-duration="800"
               data-aos-anchor-placement="center-bottom">EN BREF</h2>
          <b-col class="justified-text-center my-5"
                 cols="auto" data-aos="fade-left"
                 data-aos-delay="100"
                 data-aos-duration="800"
                 data-aos-anchor-placement="center-bottom">
            <p>
              APF France handicap est la plus importante organisation française, reconnue d’utilité publique, de défense
              et de représentation des personnes en situation de handicap et de leurs proches.
            </p>
          </b-col>
          <b-row class="my-5" align-v="center" align-h="center">
            <b-col class="my-5" cols="auto">
              <img data-aos="flip-left"
                   data-aos-duration="800"
                   data-aos-anchor-placement="center-bottom"
                   src="https://www.apf-francehandicap.org/sites/default/files/j.deya-caravaneapf_47-lr.jpg"
                   class="rounded-circle shadow-1-strong mx-3" width="200" height="200"/>
              <img data-aos="flip-left"
                   data-aos-delay="400"
                   data-aos-duration="800"
                   data-aos-anchor-placement="center-bottom"
                   src="https://www.udaf16.org/wp-content/uploads/2014/06/associations-adherentes.jpg"
                   class="rounded-circle shadow-1-strong" width="200" height="200"/>
            </b-col>
          </b-row>
          <b-col class="justified-text-center"
                 cols="auto" data-aos="zoom-in-up"
                 data-aos-duration="800"
                 data-aos-anchor-placement="center-bottom">
            <p>
              L'APF France porte des <i>valeurs humanistes, militantes et sociales</i> et un projet d’intérêt général,
              celui d’une société inclusive et solidaire.
              <br><br>
              L’association agit pour l’égalité des droits, la citoyenneté, la participation sociale et le libre choix
              du mode de vie des personnes en situation de handicap et de leur famille.
            </p>
          </b-col>
          <br>
        </a>
      </b-row>
    </b-container>

    <b-row class="m-5 ligne"></b-row>
    <b-container>
      <b-row class="row paragraphe">
        <h2 class="mb-5 mt-3" style="color: #6ec8cb"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-anchor-placement="center-bottom">CONTACT</h2>
      </b-row>
    </b-container>
    <b-container>
      <b-row class="row paragraphe">
        <div class="wrapper">
          <a href="https://www.apf-francehandicap.org/" class="icon apf"
             data-aos="flip-left"
             data-aos-duration="800"
             data-aos-anchor-placement="center-bottom">
            <div class="tooltip">APF FRANCE</div>
            <span><b-icon icon="globe2"></b-icon></span>
          </a><a href="https://www.facebook.com/associationdesparalysesdefrance" class="icon facebook"
                 data-aos="flip-left"
                 data-aos-duration="800"
                 data-aos-delay="300"
                 data-aos-anchor-placement="center-bottom">
          <div class="tooltip">Facebook</div>
          <span><b-icon icon="facebook"></b-icon></span>
        </a>
          <a href="https://twitter.com/apfhandicap?lang=fr" class="icon twitter"
             data-aos="flip-left"
             data-aos-duration="800"
             data-aos-delay="600"
             data-aos-anchor-placement="center-bottom">
            <div class="tooltip">Twitter</div>
            <span><b-icon icon="twitter"></b-icon></span>
          </a>
          <a href="https://www.linkedin.com/company/apfhandicap/" class="icon linkedin"
             data-aos="flip-left"
             data-aos-duration="800"
             data-aos-delay="900"
             data-aos-anchor-placement="center-bottom">
            <div class="tooltip">Linkedin</div>
            <span><b-icon icon="linkedin"></b-icon></span>
          </a>
          <a href="https://www.youtube.com/user/APFhandicap" class="icon youtube"
             data-aos="flip-left"
             data-aos-duration="800"
             data-aos-delay="1200"
             data-aos-anchor-placement="center-bottom">
            <div class="tooltip">Youtube</div>
            <span><b-icon icon="youtube"></b-icon></span>
          </a>
        </div>
      </b-row>
    </b-container>
    <br><br>
  </b-container>
  </div>
</template>

<script>
import appAssosSlide from "@/views/association/assosSlide.vue";
import {mapState} from "vuex";

export default {
  name: "associationVue",
  components: {
    'app-assos-slide': appAssosSlide,
  },
  computed: {
    ...mapState(['layoutHeight']),
    images() {
      const path = require.context('../../../public/img/associationPicture', false, /\.jpg$/)
      return path.keys().map(path)
    }
  }
}
</script>

<style>
@import '../../../public/css/association/association.css';
</style>