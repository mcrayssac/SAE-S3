<template>
  <div class="container-fluid mt-5 p-5">

    <h2 style="text-align: center;">Commentaires</h2>

    <div class="mt-4" v-if="listCom.length == 0">
      <p>Pas de commentaires</p>
    </div>

    <div class="mt-5 container" v-else>
      <b-card style="max-width: 100%;" class="m-3 border-0" v-for="(com, index) in listCom" :key="index">
        <b-card-header>
          <b-card-title>{{ com.prenom_public }} {{ com.nom_public }}</b-card-title>
        </b-card-header>
        <b-card-body>
          <b-row class="mt-2">Avis : {{ com.libelle_commentaire }}</b-row>
          <b-row class="mt-4">Note : {{ com.libelle_note }}</b-row>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentaires",
  data: function() {
    return {
      listCom: [
        {nom_public: '111', prenom_public: '111', libelle_commentaire: '111', libelle_note: '111'},
        {nom_public: '222', prenom_public: '222', libelle_commentaire: '222', libelle_note: '222'},
        {nom_public: '333', prenom_public: '333', libelle_commentaire: '333', libelle_note: '333'},
        {nom_public: '444', prenom_public: '444', libelle_commentaire: '444', libelle_note: '444'}
      ]
    }
  }
}
</script>

<style scoped>

</style>