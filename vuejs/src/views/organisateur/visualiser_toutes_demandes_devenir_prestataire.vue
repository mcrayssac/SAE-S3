<template>
  <div class="container-fluid mt-5 p-5">
    <!-- =================================================================================================================== dans boucle for -->
    <div v-if="listPresta.length == 0">
      <p>Aucune demande formulée</p>
    </div>
    <b-card style="max-width: 100%;" class="m-3 border-0" v-for="(presta, index) in listPresta" :key="index">
      <b-card-header>
        <b-card-title>Nom : {{presta.nom}}</b-card-title>
      </b-card-header>
      <b-card-body>
        <b-row class="mt-2">Site web : {{presta.site}}</b-row>
        <b-row class="mt-4">Email : {{presta.email}}</b-row>
        <b-row class="mt-4">Téléphone : {{presta.tel}}</b-row>
        <b-row class="mt-4">Type de l'établissement : {{presta.type}}</b-row>
        <b-row class="mt-4">Besoins spécifiques : {{presta.besoin}}</b-row>
        <b-row class="mt-4">
          <button type="submit" class="btn btn-reset w-25 me-2">Refuser</button>
          <button type="submit" class="btn btn-submit w-25 ms-2">Accepter</button>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
// export default {
//   name: "visualiser_toutes_demandes_devenir_prestataire"
// }

module.exports = {
  data: function() {
    return {
      title: 'Titre de mon application',
      listPresta: [
        {nom: '111', site: '111', email: '111', tel: '111', type: '', besoin: '111'},
        {nom: '222', site: '222', email: '222', tel: '222', type: '', besoin: '222'},
      ]
    }
  }
}
</script>

<style>
  .btn {
    font-weight: bold;
    color: white;
  }
  .btn:hover {
    font-weight: bold;
    color: white;
    transform: scale(1.06);
  }
  .btn-submit {
    background-color: #495388;
    border-color: #495388;
  }
  .btn-submit:hover {
    background-color: #495388;
    border-color: #495388;
  }
  .btn-reset {
    background-color: #6ec8cb;
    border-color: #6ec8cb;
  }
  .btn-reset:hover {
    background-color: #6ec8cb;
    border-color: #6ec8cb;
  }
</style>