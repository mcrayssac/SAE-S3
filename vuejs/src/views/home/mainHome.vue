<template>
  <div>
    <b-carousel
        id="carousel-fade"
        fade
        indicators
        img-width="1024"
        img-height="480"
    >
      <b-carousel-slide v-for="(item, index) in slide" :key="index"
          :img-src="item"
      ></b-carousel-slide>
    </b-carousel>

    <br>

    <b-container>
      <b-row align-h="center">
        <b-col cols="auto"><h1 :style="darkBlue">LAKESIDE SPORTS FESTIVAL</h1></b-col>
      </b-row>
      <br><br>
      <b-row align-h="center">
        <b-col cols="auto"><h2>POURQUOI CET EVENEMENT ?</h2></b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="auto"><div class="justified-text-center">
          Venez participer au travers de nombreuses épreuves et récolter des fonds pour <br> <strong> l’APF (Association des paralysés de France) ! </strong> <br><br>
          Natation, athlétisme, VTT et bien d’autres encore seront au rendez-vous pour vous faire passer un moment inoubliable entre amis, en famille ou en solitaire.<br>
          Alors n’hésitez plus et ressortez vos vieilles baskets du placard pour venir vous challenger dans la bonne humeur !<br>
          Tous les bénéfices de cet évènement seront reversés à l’association APF pour aider à inclure les personnes à mobilité réduite dans le monde du sport. <br><br>
          Pour plus d’informations, voir sur la page d’APF.<br>
        </div></b-col>
      </b-row>

      <b-row align-h="center" style="margin-top: 20px">
        <b-col cols="auto"><a class="center" href="/association" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/1/16/Logo_APF_France_Handicap_2018.svg/langfr-195px-Logo_APF_France_Handicap_2018.svg.png">
        </a></b-col>
      </b-row>

      <b-row class="mt-5 mb-5 ligne"></b-row>
      <b-row align-h="center">
        <b-col cols="auto"><h1>Notre cagnotte</h1></b-col>
      </b-row>

      <div class="row">
        <div class="col">
          <div class="circular-progress">
            <span class="progress-value">0%</span>
          </div>
        </div>
        <div class="col my-auto" style="font-size: xx-large;
                font-family: 'Montserrat', sans-serif; font-weight: 300; vertical-align: center;">
          <div class="row center">
            <a><a style="color: #6ec8cb; font-size: xxx-large;" id="compteur">{{cagnotteRecolte}}</a> € récoltés</a>
          </div>
          <div class="row center">
            <a>Objectif : <a id="objectif" style="color: #6ec8cb; font-size: xxx-large;">{{cagnotteObjectif}}</a> €</a>
          </div>
        </div>
      </div>

      <b-row class="mt-5 mb-5 ligne"></b-row>
      <b-row align-h="center">
        <b-col cols="auto"><h1>Nos partenaires</h1></b-col>
      </b-row>


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
export default {
  name: "mainHome",
  data: () => ({
    slide: ["https://cdn.discordapp.com/attachments/894224051571138560/1028048900860428371/image_home_2_filter1.png",
      "https://cdn.discordapp.com/attachments/894224051571138560/1028050754042351707/image_home_3_filter1.png",
      "https://cdn.discordapp.com/attachments/894224051571138560/1028050937757040640/image_home_4_filter1.png",
      "https://cdn.discordapp.com/attachments/894224051571138560/1028051419237994566/image_home_5_filter1.png"
    ],
    darkBlue: "color: #021331",
    cagnotteRecolte : 3000000,
    cagnotteObjectif : 4000000
  }),
  methods:{

  }
}
</script>

<style>
@import '../../../public/css/cagnotte.css';
</style>