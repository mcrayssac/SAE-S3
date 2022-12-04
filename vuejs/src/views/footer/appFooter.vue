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
          <li class="list-inline-item"><a><b-avatar src="https://media-exp1.licdn.com/dms/image/C5603AQHgSf33mmhjww/profile-displayphoto-shrink_200_200/0/1662910489004?e=1675296000&v=beta&t=eR95ZRkWndZCVWCuTNWxZnpi66Mr_XszaGH-9O4p3fA"></b-avatar> Maxime CRAYSSAC</a></li>
          <li class="list-inline-item"><a><b-avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQHuQ9PtrtwOAg/profile-displayphoto-shrink_800_800/0/1645984268259?e=1675296000&v=beta&t=x9yfZMUJbtc9AjPYwC5BLWdqi1niv40ZQJD0uie8-XY"></b-avatar> Léna ABEL</a></li>
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
  name: "appFooter"
}
</script>

<style scoped>
@import '../../../public/css/footer/appFooter.css';
</style>