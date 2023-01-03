<template>
  <div class="container-fluid mt-5 p-5">

    <h2>Résultat pour la {{ course }}</h2>

    <div class="mt-4" v-if="listPublic.length == 0">
      <p>Classement indisponible</p>
    </div>

    <div class="mt-5" v-else>
      <form>
        <input type="search" placeholder="Rechercher">
        <button class="ms-3 btn_voir_clsmt" type="submit">
          <img src="../../public/img/search.jpeg">
        </button>
      </form>
      <table>
        <b-thead>
          <b-tr>
            <b-th>Arrivée</b-th>
            <b-th>Temps</b-th>
            <b-th>Nom</b-th>
            <b-th>Prénom</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(pbc, index) in listPublic" :key="index">
            <b-td>{{ pbc.arrivee }}</b-td>
            <b-td>{{ pbc.temps }}</b-td>
            <b-td>{{ pbc.nom }}</b-td>
            <b-td>{{ pbc.prenom }}</b-td>
          </b-tr>
        </b-tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "classementCourses",
  data: function() {
    return {
      course: "course d'orientation",
      title: 'Titre de mon application',
      listPublic: null
    }
  },
  methods: {
    async getClassement() {
      await axios.get(`http://localhost:3000/courses/classement`)
      .then(result => {
        this.listPublic = result.data.data;
      })
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
        console.warn("error", message);
      });
    }
  },
  async created() {
    await this.getClassement();
  }
}
</script>

<style scoped>
input {
  border-radius: 6px;
  text-align: center;
  padding: 5px
}
.btn_voir_clsmt {
  background-color: white;
  border: 0px;
}
.btn_voir_clsmt:hover {
  background-color: white;
  border: 0px;
  transform: scale(1.06);
}
.btn_voir_clsmt img {
  width: 25px;
}
table {
  margin-top: 50px;
  min-width: 100%;
}
tr {
  text-align: center;
}
tr:hover td {
  color: #3b5999;
}
th {
  font-size: large;
  padding: 15px;
}
td {
  padding: 10px;
}
</style>