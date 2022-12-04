<template>
  <b-container fluid :style="layoutHeight">
    <section class="Title">
      <b-row align-h="center">
        <b-col class="m-5" cols="auto">
          <b-row align-h="center">
            <b-col cols="auto" data-aos="fade-right"
                   data-aos-delay="500"
                   data-aos-duration="500"
                   data-aos-anchor-placement="top-center">
              <h2>{{ title }}</h2>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="m-5" cols="auto">
          <b-row align-h="center" cols="auto" data-aos="fade-right"
                 data-aos-delay="300"
                 data-aos-duration="500"
                 data-aos-anchor-placement="top-center">
            <b-form inline>
              <b-form-input placeholder="Rechercher" v-model="inputFilter"></b-form-input>
            </b-form>
          </b-row>
        </b-col>
        <b-col v-if="getFiltres" class="m-5" cols="auto" data-aos="fade-right"
               data-aos-delay="100"
               data-aos-duration="500"
               data-aos-anchor-placement="top-center">
          <b-row align-h="center">
            <b-col cols="auto">
              <b-dropdown variant="lightBlue" toggle-class="text-white" class="button" v-for="(items, index) in getFiltres" right :key="index" :text="index">
                <b-dropdown-item variant="lightBlue" v-for="(item, jIndex) in items" :key="jIndex">{{item}}</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </section>

    <b-container>
      <section class="Card">
        <b-row v-if="getCards" align-h="center">
          <b-col class="m-5" cols="auto" style="min-width: 100%;">
            <b-row v-for="(items, index) in filteredArticles" :key="index" align-h="center">

              <b-card class="m-3" data-aos="fade-up"
                      data-aos-delay="100"
                      data-aos-duration="500"
                      data-aos-anchor-placement="top-bottom">

                <b-row>
                  <b-col cols="auto">
                    <b-img class="card-image" height="300" width="300" :src="items.url" :alt="items.title"></b-img>
                  </b-col>

                  <b-col cols="auto">
                    <b-card-body :title="items.title" style="border-left: 5px solid #495388;">
                      <b-card-text>
                        <p v-for="(item, jIndex) in items.filtres" :key="jIndex" class="card-text"> <b> {{jIndex}} : </b> {{item}}</p>

                        <b-button class="button" :href="items.title.toLowerCase().trim().replace(/ /g,'')">Voir la page</b-button>
                      </b-card-text>
                    </b-card-body>
                  </b-col>

                </b-row>

              </b-card>

            </b-row>
          </b-col>
        </b-row>
      </section>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: "prestatairePresentationComponent",
  props: {
    layoutHeight: String,
    title: String,
    getFiltres: Array,
    getCards: Array
  },
  data: () => ({
    inputFilter: ''
  }),
  computed: {
    filteredArticles() {
      return this.getCards.filter((element) => {
        return element.title.toLowerCase().match(this.inputFilter.toLowerCase());
      });
    }
  }
}
</script>

<style scoped>
@import '../../../../public/css/prestataires/prestataires/prestatairePresentationComponent.css';
</style>