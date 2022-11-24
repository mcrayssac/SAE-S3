<template>
  <h1>Signup</h1>

  <div class="container">
    <form id="signup_form" method="post" class="col" action="/signup/">
      <div class="row-auto form">
        <label for="first_name">Prénom :</label>
        <input type="text" name="first_name" class="form-control" id="first_name">
      </div>
      <div class="row-auto form">
        <label for="surname">Nom :</label>
        <input type="text" name="surname" class="form-control" id="surname">
      </div>
      <div class="row-auto form">
        <label for="email">Email :</label>
        <input type="email" name="email" class="form-control" id="email">
      </div>
      <div class="row-auto form">
        <label for="user_name">Pseudo :</label>
        <input type="text" name="user_name" class="form-control" id="user_name">
      </div>
      <div class="row-auto form">
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" class="form-control" id="password">
      </div>
      <div class="row-auto form">
        <label for="password">Entrez de nouveau votre mot de passe :</label>
        <input type="password" name="password" class="form-control" id="password">
      </div>
      <div class="row-auto form">
        <label for="age">Age :</label>
        <input type="number" name="age" class="form-control" id="age">
      </div>

      {{ # if sexe }}
      <div class="row-auto form">
        <label for="sexe" style="margin-right: 20px">Sexe :</label>
        {{ # each sexe }}
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="sexe" id="{{this}}" value="{{this}}">
          <label class="form-check-label" for="{{this}}">{{ this }}</label>
        </div>
        {{ /each }}
      </div>
      {{ /if }}

      <div class="row justify-content-center form">
        <div class="form-check">
          <input type="checkbox" id="robot" style="width: 18px; height: 18px;">
          <label for="robot"> Je ne suis pas un robot</label>
        </div>
      </div>
      <Button type="button" class="btn btn-success center" onclick="formSubmit()">Submit</Button>
    </form>
    <br><br>
  </div>
</template>

<script>
export default {
  name: "signup"
}
</script>

<style scoped>

</style>