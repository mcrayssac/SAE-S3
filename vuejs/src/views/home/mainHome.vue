<template>
  <div :style="layoutHeight">
    <app-home-slide-main :slide="slide" />
    <br>
    <b-container>
      <br>
      <section class="Time">
        <b-row align-h="center">
          <b-col data-aos="fade-up-left"
                 data-aos-offset="400"
                 data-aos-duration="8000"
                 cols="auto"><h1>3, 2, 1...PARTEZ !!!</h1></b-col>
        </b-row>
        <b-row align-h="center">
          <b-col data-aos="fade-up-right"
                 data-aos-offset="300"
                 data-aos-duration="1000"
                 cols="auto"><h6>local time : {{localTime}}</h6></b-col>
        </b-row>
      </section>

      <section class='Introduction'>
        <b-row class="mt-5 mb-5 ligne"></b-row>
        <b-row align-h="center">
          <b-col cols="auto"
                 data-aos="fade-left"
                 data-aos-offset="400"
                 data-aos-duration="8000"><h2>POURQUOI CET EVENEMENT ?</h2></b-col>
        </b-row>
        <b-row align-h="center">
          <b-col data-aos="fade-right"
                 data-aos-offset="350"
                 data-aos-duration="1000"
              class="justified-text-center" cols="10">
            Venez participer au travers de nombreuses épreuves et récolter des fonds pour <strong> l’APF (Association des paralysés de France) ! </strong> <br><br>
            Natation, athlétisme, VTT et bien d’autres encore seront au rendez-vous pour vous faire passer un moment inoubliable entre amis, en famille ou en solitaire.<br>
            Alors n’hésitez plus et ressortez vos vieilles baskets du placard pour venir vous challenger dans la bonne humeur !<br>
            Tous les bénéfices de cet évènement seront reversés à l’association APF pour aider à inclure les personnes à mobilité réduite dans le monde du sport. <br><br>
            Pour plus d’informations, voir sur la page d’<a href="/association">APF</a>.<br>
          </b-col>
        </b-row>
        <b-row data-aos="zoom-in-up"
               data-aos-offset="200"
               data-aos-duration="1000"
            align-h="center" style="margin-top: 20px">
          <b-col cols="auto"><a class="center" href="/association" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/1/16/Logo_APF_France_Handicap_2018.svg/langfr-195px-Logo_APF_France_Handicap_2018.svg.png">
          </a></b-col>
        </b-row>
      </section>

      <section class="Cagnotte">
        <b-row class="mt-5 mb-5 ligne"></b-row>
        <b-row align-h="center" style="margin-bottom: 25px;">
          <b-col data-aos="zoom-in-down"
                 data-aos-offset="350"
                 data-aos-duration="8000"
              cols="auto"><h1>Notre cagnotte</h1></b-col>
        </b-row>
        <b-row align-h="center">
          <app-home-circular-progress data-aos="zoom-in-right"
                                      data-aos-offset="300"
                                      data-aos-duration="1000"
              :cagnotte-recolte="cagnotteRecolte" :cagnotte-objectif="cagnotteObjectif" />
          <b-col cols="auto" style="font-size: xx-large;
                font-family: 'Montserrat', sans-serif; font-weight: 300; vertical-align: center;">
            <b-row data-aos="fade-left"
                   data-aos-offset="300"
                   data-aos-duration="1000"
                rows="auto" align-h="center">
              <a style="color: #495388;"><a style="color: #6ec8cb; font-size: xxx-large;" id="compteur">{{placeDot(cagnotte)}}</a> € récoltés</a>
            </b-row>
            <b-row data-aos="fade-right"
                   data-aos-offset="200"
                   data-aos-duration="1000"
                rows="auto" align-h="center">
              <a style="color: #495388;">Objectif : <a id="objectif" style="color: #6ec8cb; font-size: xxx-large;">{{placeDot(cagnotteObjectif)}}</a> €</a>
            </b-row>
          </b-col>
        </b-row>
      </section>

      <section class="Sponsor">
        <b-row class="mt-5 mb-5 ligne"></b-row>
        <b-row align-h="center">
          <b-col data-aos="zoom-in-up"
                 data-aos-offset="400"
                 data-aos-duration="8000"
              cols="auto"><h1>Nos partenaires</h1></b-col>
        </b-row>
        <app-home-slide-sponsor data-aos="fade-right"
                                data-aos-offset="250"
                                data-aos-duration="2000"
            :slide-sponsor="slideSponsor" />
      </section>

      <b-row class="mt-5 mb-5 ligne"></b-row>
      <b-row align-h="center">
        <b-col cols="auto"><h3>Palettes de couleurs</h3></b-col>
      </b-row>
      <div class="row" style="border: 2px solid #1a265a; border-style: solid solid none solid;">
        <div class="col text-center" style="background-color: #495388; height: 100px; width: 100px;"></div>
        <div class="col text-center" style="background-color: #ffffff"></div>
        <div class="col text-center" style="background-color: #6ec8cb"></div>
        <div class="col text-center" style="background-color: #d9231a"></div>
        <div class="col text-center" style="background-color: #021331"></div>
      </div>
      <div class="row" style="border: 2px solid #1a265a;">
        <div class="col text-center">
          <a>#495388</a>
        </div>
        <div class="col text-center">
          <a>#ffffff</a>
        </div>
        <div class="col text-center">
          <a>#6ec8cb</a>
        </div>
        <div class="col text-center">
          <a>#d9231a</a>
        </div>
        <div class="col text-center">
          <a>#021331</a>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import appHomeSlideMain from "@/views/home/homeSlideMain/homeSlideMain.vue";
import appHomeSlideSponsor from "@/views/home/homeSlideSponsor/homeSlideSponsor.vue";
import appHomeCircularProgress from "@/views/home/homeCircularProgress/homeCircularProgress";
export default {
  name: "mainHome",
  components: {
    'app-home-slide-main':appHomeSlideMain,
    'app-home-slide-sponsor':appHomeSlideSponsor,
    'app-home-circular-progress':appHomeCircularProgress
  },
  data: () => ({
    layoutHeight: "margin-top : "+51+"px",
    slide: ["https://cdn.discordapp.com/attachments/894224051571138560/1028048900860428371/image_home_2_filter1.png",
      "https://cdn.discordapp.com/attachments/894224051571138560/1028050754042351707/image_home_3_filter1.png",
      "https://cdn.discordapp.com/attachments/894224051571138560/1028050937757040640/image_home_4_filter1.png",
      "https://cdn.discordapp.com/attachments/894224051571138560/1028051419237994566/image_home_5_filter1.png"
    ],
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
    cagnotteRecolte : 3843029,
    cagnotteObjectif : 5000000,
    gradient: {
      radial: false,
      colors: [
        {
          color: '#6ec8cb',
          offset: "0",
          opacity: '1',
        },
        {
          color: '#d9231a',
          offset: "100",
          opacity: '1',
        },
      ]
    },
    localTime: " ",
    cagnotte: 3843029,
    cagnotteTop: null,
    counter: 0,
  }),
  methods:{
    dotReplaced(str){
      return parseInt(str.toString().replace(/\./g, ''));
    },
    placeDot(str){
      return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    setCagnotte: function () {
      let time = this;
      setInterval(function () {
        time.localTime = new Date().toLocaleTimeString();
      }, 0);
    },
    showLocaleTime: function () {
      let time = this;
      setInterval(function () {
        console.log(time.cagnotte);
        let res = time.dotReplaced(time.cagnotte);
        time.cagnotte = time.placeDot(res++);
      }, 5);
    },
    timer: function() { setInterval(this.tikTok, 125); },
    tikTok: function() {
      if (this.cagnotte >= this.cagnotteTop) {
        if (Math.random() > 0.95)
          this.cagnotte += 1;
      }
      else {
        if (this.cagnotte<this.cagnotteTop-999990)
          this.cagnotte+=1;
        else if (this.cagnotte<this.cagnotteTop-999900)
          this.cagnotte+=10;
        else if (this.cagnotte<this.cagnotteTop-999000)
          this.cagnotte+=100;
        else if (this.cagnotte<this.cagnotteTop-990000)
          this.cagnotte+=1000;
        else if (this.cagnotte<this.cagnotteTop-900000)
          this.cagnotte+=10000;
        else if (this.cagnotte<this.cagnotteTop)
          this.cagnotte+=100000;
      }
    }
  },mounted() {
    this.cagnotteTop = this.cagnotte;
    this.cagnotte-=1000000;
    this.setCagnotte();
    this.$nextTick(() => {
      this.timer();
    });
  }
}
</script>

<style>
@import '../../../public/css/cagnotte.css';
@import '../../../public/css/home.css';
.Introduction{
  overflow:hidden;
}
.Cagnotte{
  overflow: hidden;
}
.Sponsor{
  overflow: hidden;
}
.Time{
  overflow: hidden;
}
</style>