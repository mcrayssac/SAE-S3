<template>
  <div>
    <div class="mt-5 footer-basic">
      <b-row align-h="center" style="margin-bottom: 8px;">
        <b-col cols="auto">
          <a href="https://github.com/mcrayssac/SAE-S3" target="_blank" style="font-size: x-large;">
            <b-icon title="Github" icon="github" class="rounded-circle" style="color: white;"></b-icon>
          </a>
        </b-col>
        <b-col cols="auto">
            <a href="mailto:maxime.crayssac@edu.univ-fcomte.fr" target="_blank" style="font-size: x-large;">
              <b-icon title="Email" icon="envelope-fill" class="rounded-circle" style="color: white;"></b-icon>
            </a>
        </b-col>
        <b-col cols="auto">
          <a href="#top" role="button" style="font-size: x-large;">
            <b-icon title="Go to top" icon="arrow-up-circle-fill" class="rounded-circle" style="color: white;"></b-icon>
          </a>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <ul class="list-inline" style="max-width: 1270px;">
          <li class="list-inline-item"><a>Maxime CRAYSSAC</a></li>
          <li class="list-inline-item"><a>Léna ABEL</a></li>
          <li class="list-inline-item"><a>Messaline BEAUDRU</a></li>
          <li class="list-inline-item"><a>Mélanie BENOIT</a></li>
          <li class="list-inline-item"><a>Giuliana GODAIL FABRIZIO</a></li>
          <li class="list-inline-item"><a>Lilian HERNANDEZ</a></li>
        </ul>
      </b-row>
      <b-row align-h="center">
        <p class="copyright">LAKESIDE SPORTS FESTIVAL © 2003</p>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer"
}
</script>

<style scoped>
@import '../../../public/css/footer.css';
@import '../../../public/css/home.css';
</style>