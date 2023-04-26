<template>
  <div style="margin-top: 100px;">
    <button @click="authenticateWithTwitter">Se connecter avec Twitter</button>
  </div>
</template>

<script>
export default {
  name: "TwitterTest",
  methods: {
    async authenticateWithTwitter() {
      // Ouvrez une nouvelle fenêtre pour permettre à l'utilisateur de se connecter et d'autoriser l'application
      const authWindow = window.open("http://localhost:3003/auth/twitter", "Authentification Twitter", "width=800, height=600");
      // Surveillez les messages postés par la fenêtre d'authentification
      window.addEventListener("message", async (event) => {
        if (event.origin === "http://localhost:3003") {
          // Fermez la fenêtre d'authentification
          authWindow.close();
          // Récupérez le JWT à partir des données de l'événement
          const jwtToken = event.data;
          // Utilisez le JWT pour effectuer des requêtes authentifiées à votre API
          console.log("JWT Token:", jwtToken);
        }
      });
    },
  },
};
</script>