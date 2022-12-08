<template>
  <div class="container-fluid mt-5 p-5">
<!-- =================================================================================================================== dans boucle for -->
    <b-card-group>
      <b-card style="max-width: 50%;" class="m-3 border-0">
        <b-card-header>
          <b-card-title>Nom : </b-card-title>
        </b-card-header>
        <b-card-body>
          <b-row class="mt-2">Site web :</b-row>
          <b-row class="mt-4">Email :</b-row>
          <b-row class="mt-4">Téléphone :</b-row>
          <b-row class="mt-4">Type de l'établissement :</b-row>
          <b-row class="mt-4">Besoins spécifiques :</b-row>
          <b-row class="mt-4">
            <button type="submit" class="btn btn-reset w-25 me-1">Refuser</button>
            <button type="submit" class="btn btn-submit w-25 ms-1">Accepter</button>
          </b-row>
        </b-card-body>
      </b-card>

<!-- =================================================================================================================== si module de la length du result == 0 -->
      <b-card style="max-width: 50%;" class="m-3 border-0">
        <b-card-header>
          <b-card-title>Nom : </b-card-title>
        </b-card-header>
        <b-card-body>
          <b-row class="mt-2">Site web :</b-row>
          <b-row class="mt-4">Email :</b-row>
          <b-row class="mt-4">Téléphone :</b-row>
          <b-row class="mt-4">Type de l'établissement :</b-row>
          <b-row class="mt-4">Besoins spécifiques :</b-row>
          <b-row class="mt-4">
            <button type="submit" class="btn btn-reset w-25 me-1">Refuser</button>
            <button type="submit" class="btn btn-submit w-25 ms-1">Accepter</button>
          </b-row>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<!-- =================================================================================================================== style -->
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