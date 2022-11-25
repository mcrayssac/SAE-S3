<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="top">
    <div class="container-fluid">
      <a href="http://localhost:3000/home">
        <img src="https://cdn.discordapp.com/attachments/1019997748344406146/1027862507618058292/logo_3_1.png"
             class="rounded" alt="IUT LOGO" width="65" height="60" class="d-inline-block align-text-top">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link active" href="/"><i class="bi bi-geo-alt-fill"></i> Map</a>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"
               data-toggle="dropdown"><i class="bi bi-shop"></i> Prestataires</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="/restaurants">Restaurant</a>
              <a class="dropdown-item" href="/clubs">Club</a>
              <a class="dropdown-item" href="#">Vente</a>
              <a class="dropdown-item" href="#">...</a>
            </div>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
               data-toggle="dropdown"><i class="bi bi-list-check"></i> Activités</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Initiation</a>
              <a class="dropdown-item" href="#">Scène</a>
              <a class="dropdown-item" href="#">Compétitions</a>
            </div>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
               data-toggle="dropdown"><i class="bi bi-trophy-fill"></i> Résultats</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Course à pied</a>
              <a class="dropdown-item" href="#">VTT</a>
              <a class="dropdown-item" href="#">Natation</a>
              <a class="dropdown-item" href="#">Course d'orientation</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/association"><i class="bi bi-house-heart-fill"></i> Association</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
               data-toggle="dropdown"><i class="bi bi-person-fill"></i>Nom Prénom</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Planning personnalisé</a>
              <a class="dropdown-item" href="#">Mes activités</a>
              <a class="dropdown-item" href="/home">Déconnexion</a>
            </div>
          </li>
          <a class="dropdown-item d" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-225px-Flag_of_France.svg.png" width="25px" height="15px" style="margin: auto; height: auto"></a>
          <a class="dropdown-item d" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/langfr-338px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" width="25px" height="15px"></a>
        </ul>
      </div>
    </div>
  </nav>




  {{body}}




  <div class="footer-basic">
    <footer>
      <div class="social"><a href="https://github.com/mcrayssac/SAE-S3"><i class="bi bi-github"></i></a>
        <a href="mailto:maxime.crayssac@edu.univ-fcomte.fr"><i class="bi bi-envelope-fill"></i></a>
        <a href="#top" role="button"><i class="bi bi-arrow-up-circle-fill"></i></a></div>
      <ul class="list-inline">
        <li class="list-inline-item"><a>Maxime CRAYSSAC</a></li>
        <li class="list-inline-item"><a>Léna ABEL</a></li>
        <li class="list-inline-item"><a>Messaline BEAUDRU</a></li>
        <li class="list-inline-item"><a>Mélanie BENOIT</a></li>
        <li class="list-inline-item"><a>Giuliana GODAIL FABRIZIO</a></li>
        <li class="list-inline-item"><a>Lilian HERNANDEZ</a></li>
      </ul>
      <p class="copyright">LAKESIDE SPORTS FESTIVAL © 2003</p>
    </footer>
  </div>

</template>

<script>
export default {
  name: "mainSurnameName"
}
</script>

<style scoped>

</style>