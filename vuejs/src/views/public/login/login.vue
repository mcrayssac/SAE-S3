<template>
  <div class="container">
    <div class="flashes my-2">
      {{ # if flashMessages }}
      {{ # if flashMessages.success }}
      <div class="alert alert-success">
        {{ flashMessages.success }}
      </div>
      {{ /if }}
      {{ # if flashMessages.error }}
      <div class="alert alert-danger">
        {{ flashMessages.error }}
      </div>
      {{ /if }}
      {{ /if }}
    </div>
    <h1>Login</h1>
    <form id="login_form" method="post" class="col" action="/login/">
      <div class="row-auto form">
        <label for="user_name_email">Email/Pseudo :</label>
        <input type="text" name="user_name_email" class="form-control" id="user_name_email"
               placeholder="username/email">
      </div>
      <div class="row-auto form">
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" class="form-control" id="password" placeholder="password">
      </div>
      <div class="row justify-content-center form">
        <div class="form-check">
          <input type="checkbox" id="robot" style="width: 18px; height: 18px;">
          <label for="robot"> Je ne suis pas un robot</label>
        </div>
      </div>
      <Button type="button" class="btn btn-success center" onclick="formSubmit()" style="margin-bottom: 25px">Submit
      </Button>
    </form>
    <br><br>
  </div>

</template>

<script>
export default {
  name: "login"
}
</script>

<style scoped>

</style>