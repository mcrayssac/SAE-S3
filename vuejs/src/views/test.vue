<template>
  <main id="app">
    <section class='intro'>
      <div class='introDescription' data-aos="zoom-in" data-aos-ease = 'ease'
           data-aos-duration="1500"
           data-aos-delay='500' >
        A student's Guide
        <br>
        <p>  to Learning from Home </p>
      </div>
      <img  class='introImage' src='https://res.cloudinary.com/dsderm9xw/image/upload/v1622028117/3D%20Illustrations/3d-illustration4_usckww.png' alt='3d illustration of boy with a flag'/>

    </section>

    <section class='guide1'>
      <img class='guide1Image' src='https://res.cloudinary.com/dsderm9xw/image/upload/v1622028085/3D%20Illustrations/3d-illustration2_ykuua3.png'
           alt='3d illustration of boy sitting with legs crossed'
           data-aos="slide-down"
           data-aos-ease = 'ease'
           data-aos-duration="1500"
           data-aos-delay='500'/>
      <div class='guide1Description'
           data-aos="slide-up"
           data-aos-ease = 'ease'
           data-aos-duration="1500"
           data-aos-delay='1000'>
        <h1> Set up your  <br> study space. </h1>
        <div>
          Find an area in your house where
          <br>
          you can sit comfortably and focus.
          <br>
          Make it separate to your relaxation space.
          <br>
          Ideally away from a TV screen
          <br>
          or other distractions.
        </div>
      </div>


    </section>

    <section class='guide2'>
      <div class='guide2Description'
           data-aos="slide-down"
           data-aos-ease = 'ease'
           data-aos-duration="1500"
           data-aos-delay='1000'>
        <h1> Plan your  <br> day ahead. </h1>
        <div>
          If you have one,
          <br>
          follow the schedule provided by your school.
          <br>
          If you just have a list of things to study,
          <br>
          break it down into small tasks and
          <br>
          plan to do the hardest ones
          <br>
          when you have the most energy.
        </div>
      </div>
      <img class='guide2Image' src='https://res.cloudinary.com/dsderm9xw/image/upload/v1622028057/3D%20Illustrations/3d-illustration1_j06j0a.png'
           alt='3d illustration of boy with laptop sitting'
           data-aos="slide-up"
           data-aos-duration="1500"
           data-aos-ease = 'ease'
           data-aos-delay='1000'
      />

      <div class='guide2Description'
           data-aos="slide-down"
           data-aos-ease = 'ease'
           data-aos-duration="1500"
           data-aos-delay='1000'><h1>AKZFAOAFFA</h1></div>

    </section>

    <footer>
      Developed by FAE
    </footer>
  </main>
</template>


<script>

export default {
  name: "test",
  data: () => ({
    layoutHeight: "margin-top : "+76+"px"
  }),
  methods:{

  },
  created() {

  },
  mounted() {

  },
  destroyed() {

  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
.intro{
  display:flex;
  background: #fff3e2;
  justify-content: space-evenly;
  padding-top:80px;
  height: 500px;
}
.introDescription {
  font-size:30px;
  color:#632b2b;
  padding-top:120px;
}
.introDescription p{
  font-size:60px;
  color:#632b2b;
  font-weight: 900;
}
.guide1{
  display:flex;
  background: #ffd4a9;
  justify-content: space-evenly;
  padding-top:80px;
  height: 500px;
  overflow:hidden;
}
.guide1Description h1{
  font-size:48px;
  color:#632b2b;
  padding: 120px 0px 20px 0px;
}
.guide1Description div{
  background:#fff3e2 ;
  color:#632b2b;
  font-size:20px;
  padding:10px;
  border-radius:10px;
}
.guide2{
  display:flex;
  background: #fff3e2;
  justify-content: space-evenly;
  padding-top:80px;
  height: 500px;
  overflow:hidden;
}
.guide2Description h1{
  font-size:48px;
  color:#632b2b;
  padding: 120px 0px 20px 0px;
}
.guide2Description div{
  background:#ffd4a9 ;
  color:#632b2b;
  font-size:20px;
  padding:10px;
  border-radius:10px;
}
footer{
  background: #ffd4a9;
  color:#632b2b;
  padding:10px;
  text-align: right;
  font-weight: 900;
}
/* responsiveness */
@media screen and (max-width: 500px){
  .intro{
    display:block;
    padding-top:10px;
    height:auto;
  }
  .introImage{
    width:100%;
  }
  .introDescription {
    padding: 30px 0px 0px 20px;
  }
  .guide1{
    display:block;
    padding-top:10px;
    height:auto;
  }
  .guide1Image{
    width:100%;
  }
  .guide1Description {
    padding: 20px;
  }
  .guide1Description h1{
    padding:30px 0px;
  }
}
</style>