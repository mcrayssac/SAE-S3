<template>
  <main id="app">
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
    <br><br>
    <br><br>
    <b-modal body-text-variant="danger" ref="login-error-modal" title="Lakeside Sports Festival">
      <b-col class="my-3">
        <b-row class="my-1" align-h="center">
          <b-col cols="auto">
            <span style="font-size: x-large; font-family: 'Montserrat', sans-serif;">Email ou mot de passe erroné !</span>
          </b-col>
        </b-row>
        <b-row class="my-1" align-h="center">
          <b-col cols="auto">
            <span style="font-size: large; font-family: 'Montserrat', sans-serif;">Veuillez réessayer</span>
          </b-col>
        </b-row>
      </b-col>
      <template #modal-footer >
        <b-row class="mx-auto" align-h="center">
          <b-col cols="auto">
            <b-button @click="hideLoginErrorModal">Close</b-button>
          </b-col>
        </b-row>
      </template>
    </b-modal>
    <button @click="showLoginErrorModal">show</button>
  </main>
</template>


<script>

export default {
  name: "test",
  data: () => ({
    modalShow: false
  }),
  methods:{
    showLoginErrorModal() {
      this.$refs['login-error-modal'].show()
    },
    hideLoginErrorModal() {
      this.$refs['login-error-modal'].hide()
    }
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