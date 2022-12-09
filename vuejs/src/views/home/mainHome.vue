<template>
  <div :style="layoutHeight">
    <app-home-slide-main :slide="images" />
    <b-container fluid>
      <b-alert v-model="alert" variant="danger" dismissible>
        Alert!
      </b-alert>

      <section class="ScrollBar">
        <b-row align-h="center" style="background-color: #495388; width: auto">
          <b-col class="m-4" cols="auto">
            <h2 style="color: white">
              <b-icon icon="arrow-down" animation="cylon-vertical"></b-icon>
              Scroll down
              <b-icon icon="arrow-down" animation="cylon-vertical"></b-icon>
            </h2>
          </b-col>
        </b-row>
      </section>

      <section class="Time">
          <b-row align-h="center">
            <b-col cols="auto" class="m-5">
              <b-row data-aos="fade-up-left"
                     data-aos-duration="500"
                     data-aos-anchor-placement="top-center">
                <h1>3, <span style="color: #6ec8cb;">2</span>, <span style="color: #d9231a;">1</span>...PARTEZ !!!</h1>
              </b-row>
              <b-row align-h="center"
                     data-aos="fade-up-right"
                     data-aos-duration="500"
                     data-aos-anchor-placement="top-center">
                <b-col cols="auto">
                  <h6 style="color: #021331;">Notre evenement commence dans...</h6>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <app-home-compte-rebour class="m-5"/>
      </section>

      <section class='Introduction'>
        <b-row class="m-5 ligne"></b-row>
        <b-row align-h="center">
          <b-col cols="auto" class="m-5"
                 data-aos="fade-left"
                 data-aos-offset="400"
                 data-aos-duration="8000"><h2>POURQUOI CET EVENEMENT ?</h2></b-col>
        </b-row>
        <b-row align-h="center">
          <b-col data-aos="fade-right"
                 data-aos-offset="350"
                 data-aos-duration="1000"
              class="justified-text-center" cols="10">
            <p>Venez participer au travers de nombreuses épreuves et récolter des fonds pour <strong> l’APF (Association des paralysés de France) ! </strong> <br><br>
            Natation, athlétisme, VTT et bien d’autres encore seront au rendez-vous pour vous faire passer un moment inoubliable entre amis, en famille ou en solitaire.<br>
            Alors n’hésitez plus et ressortez vos vieilles baskets du placard pour venir vous challenger dans la bonne humeur !<br>
            Tous les bénéfices de cet évènement seront reversés à l’association APF pour aider à inclure les personnes à mobilité réduite dans le monde du sport. <br><br>
              Pour plus d’informations, voir sur la page d’<b-link href="/association">APF</b-link>.</p><br>
          </b-col>
        </b-row>
        <b-row data-aos="zoom-in-up"
               data-aos-offset="200"
               data-aos-duration="1000"
            align-h="center">
          <b-col cols="auto" class="mb-5">
            <b-link href="/association" target="_blank">
              <b-img src="https://upload.wikimedia.org/wikipedia/fr/thumb/1/16/Logo_APF_France_Handicap_2018.svg/langfr-195px-Logo_APF_France_Handicap_2018.svg.png"></b-img>
            </b-link>
          </b-col>
        </b-row>
      </section>

      <section class="Cagnotte">
        <app-home-cagnotte/>
      </section>

      <section class="Carte">
        <b-row class="m-5 ligne"></b-row>
        <b-row align-h="center">
          <b-col data-aos="fade-down"
                 data-aos-anchor-placement="bottom-bottom"
                 data-aos-duration="1000"
                 cols="auto" class="m-5"><h1>Notre Carte</h1></b-col>
        </b-row>
        <b-row align-h="center">
          <b-col data-aos="fade-left"
                 data-aos-anchor-placement="center-bottom"
                 data-aos-duration="500"
                 cols="auto" class="mb-5">
            <img src="https://media.discordapp.net/attachments/1030117715534434334/1047946254191165490/image.png?width=771&height=468">
          </b-col>
        </b-row>
      </section>

      <section class="Sponsor">
        <b-row class="mt-5 mb-5 ligne"></b-row>
        <b-row align-h="center">
          <b-col data-aos="zoom-in-up"
                 data-aos-offset="400"
                 data-aos-duration="8000"
              cols="auto" class="m-5"><h1>Nos partenaires</h1></b-col>
        </b-row>
        <app-home-slide-sponsor data-aos="fade-right"
                                data-aos-offset="250"
                                data-aos-duration="2000"
            :slide-sponsor="slideSponsor" />
      </section>

    </b-container>
  </div>
</template>

<script>
import appHomeSlideMain from "@/views/home/homeSlideMain/homeSlideMain.vue";
import appHomeSlideSponsor from "@/views/home/homeSlideSponsor/homeSlideSponsor.vue";
import appHomeCompteRebour from "@/views/home/homeCompteRebour/homeCompteRebour.vue";
import appHomeCagnotte from "@/views/home/homeCagnotte/homeCagnotte.vue";
import {mapState} from "vuex";
export default {
  name: "mainHome",
  components: {
    'app-home-slide-main':appHomeSlideMain,
    'app-home-slide-sponsor':appHomeSlideSponsor,
    'app-home-compte-rebour':appHomeCompteRebour,
    'app-home-cagnotte':appHomeCagnotte,
  },
  data: () => ({
    layoutHeight: "margin-top : "+51+"px",
    slideSponsor: [
      {"titre": "Decathlon", "src": "https://www.decathlon.fr", "photo": "https://pbs.twimg.com/profile_images/1096041902351224833/KQKNxhzS_400x400.png"},
      {"titre": "InterSport", "src": "https://www.intersport.fr", "photo": "https://pbs.twimg.com/profile_images/1037247605724598274/Dt7llTkQ_400x400.jpg"},
      {"titre": "GoSport", "src": "https://www.go-sport.com", "photo": "https://pbs.twimg.com/profile_images/1567498382062624771/3UmQRjqN_400x400.jpg"},
      {"titre": "iRun", "src": "https://www.i-run.fr", "photo": "https://pbs.twimg.com/profile_images/844920305193832448/d_zVM1Ua_400x400.jpg"},
      {"titre": "Specialized", "src": "https://www.specialized.com", "photo": "https://pbs.twimg.com/profile_images/923284211917819904/C8DoeGEH_400x400.jpg"},
      {"titre": "Vittel", "src": "https://www.vittel.fr", "photo": "https://pbs.twimg.com/media/D3acuknWAAYci9j.jpg"},
      {"titre": "Arena", "src": "https://www.arenasport.com", "photo": "https://pbs.twimg.com/profile_images/1255923526294556676/l_pR-TGX_400x400.jpg"},
      {"titre": "Nike", "src": "https://www.nike.com", "photo": "https://pbs.twimg.com/profile_images/1532044350019907585/Oo1-e1N2_400x400.jpg"},
      {"titre": "Adidas", "src": "https://www.adidas.fr", "photo": "https://pbs.twimg.com/profile_images/1564299301123137545/d1yZqve6_400x400.png"},
      {"titre": "TourDeFrance", "src": "https://www.letour.fr", "photo": "https://pbs.twimg.com/profile_images/1182279755552428033/8mX_dsXW_400x400.jpg"},
      {"titre": "Puma", "src": "https://eu.puma.com", "photo": "https://pbs.twimg.com/profile_images/1549763746398179329/CzTqIf6C_400x400.jpg"},
      {"titre": "TheNorthFace", "src": "https://www.thenorthface.fr", "photo": "https://pbs.twimg.com/profile_images/1410536405005221889/ac3a_xm4_400x400.jpg"},
      {"titre": "Columbia", "src": "https://www.columbiasportswear.fr", "photo": "https://pbs.twimg.com/profile_images/1278340936066461696/JZ_qCeUw_400x400.png"},
      {"titre": "Salomon", "src": "https://www.salomon.com", "photo": "https://media.cdnws.com/_i/46016/5472/2489/76/stickers-salomon-ref2-autocollant-snow-snowboard-sticker-ski-neige-sport-extreme-logo-planche-autocollants-snowboarding-decals-snowboards-sponsors-min.jpeg"},
      {"titre": "Scott", "src": "https://www.scott-sports.com", "photo": "https://www.montania-sport.com/54657-thickbox_default/piece-detachee-bootfitting-chaussures-ski-scott.jpg"},
      {"titre": "Picture", "src": "https://www.picture-organic-clothing.com", "photo": "https://yt3.ggpht.com/ytc/AMLnZu8jvzx771u6SVIWEk2ovWfAft5VRHfpH1X7Xz9raw=s900-c-k-c0x00ffffff-no-rj"}
    ],
    darkBlue: "color: #021331",
    counter: 0,
  }),
  computed: {
    images () {
      const path = require.context('../home/picture', false, /\.jpg$/)
      return path.keys().map(path)
    }
  }
}
</script>

<style>
@import '../../../public/css/home/home.css';
</style>