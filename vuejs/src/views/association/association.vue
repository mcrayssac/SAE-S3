<template>
      <b-container class="container" :style="layoutHeight">
        <br><br>
        <b-row class="row paragraphe">
          <a><h2>L’HISTOIRE D’APF FRANCE HANDICAP</h2>
            <div class="justified-text-center">
              <span>APF France handicap (connue jusqu'en 2018 sous le nom d'Association des paralysés de France) a été créée en
                    1933 par quatre jeunes atteints de poliomyélite : <strong><i>André Trannoy, Jacques Dubuisson, Jeanne Henry et
                    Clothilde Lamborot.</i></strong>
                    Révoltés par l'exclusion dont ils étaient victimes et souhaitant rompre l'isolement des personnes en
                    situation de handicap, ils créent l'association en avril 1933.</span>
            </div>
            <br><br>
            <section class="vh-10" style="background-color: #495388;">
              <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col col-lg-10 col-xl-8">
                    <div class="card rounded-3">
                      <div class="card-body p-5">
                        <div style="zoom: 150%" class="d-flex justify-content-center mb-4">
                          <img src="https://www.apf-francehandicap.org/sites/default/files/styles/testimony_widget/public/a_trannoy_copier.jpg?itok=eLAtiMj8p" class="rounded-circle shadow-1-strong" width="100" height="100"/>
                        </div>
                        <figure class="text-center mb-0">
                          <blockquote class="blockquote mb-4">
                            <p>
                              <span class="font-italic">Je souhaite que ceux qui viennent et viendront auprès d'APF France handicap trouvent toujours auprès d'elle cet « autre chose » qui est l'essentiel.</span>
                            </p>
                          </blockquote>
                          <figcaption class="blockquote-footer mb-0">
                            ANDRÉ TRANNOY, <cite title="Source Title">FONDATEUR DE L'ASSOCIATION</cite>
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <br>
            <div class="justified-text-center">
              <span> Au fil des années, APF France handicap se développe :
                  <br><br>
              <div id="containerIntro">
                  <h3 style="color:#6ec8cb">ELLE CREE</h3> <p>des établissements et services de soins,</p>
                  <br><br>
                  <h3 style="color:#df1b3f">ELLE S'ENGAGE</h3><p> pour faire évoluer la législation en matière de handicap <br>et fédère de plus en plus de personnes en situation de handicap,<br> mobilisées pour défendre leurs droits.</p>
              </div>
                  <br>
                  La devise d'André Trannoy <i>« risquer l’impossible » </i>reste aujourd'hui d'actualité :
                  <br>plus de 93 000 acteurs sont mobilisés au quotidien pour faire vivre cet engagement et construire une société solidaire ouverte à tous.
              </span>
            </div>
          </a>
      </b-row>
        <div class="row ligne"></div>
        <b-container>
          <div class="row paragraphe">
            <a><h2>EN BREF</h2>
              <div class="justified-text-center">
                    <span>
                    APF France handicap est la plus importante organisation française, reconnue d’utilité publique, de défense et de représentation des personnes en situation de handicap et de leurs proches.
                    </span>
              </div>
              <br>
              <br>
              <img src="https://www.apf-francehandicap.org/sites/default/files/j.deya-caravaneapf_47-lr.jpg"
                   class="rounded-circle shadow-1-strong" width="200" height="200"/>
              <img src="https://www.udaf16.org/wp-content/uploads/2014/06/associations-adherentes.jpg"
                   class="rounded-circle shadow-1-strong" width="200" height="200"/>
              <br>
              <br>
              <div class="justified-text-center">
                <span>
                    L'APF France porte des <i>valeurs humanistes, militantes et sociales</i> et un projet d’intérêt général, celui d’une société inclusive et solidaire.
                    <br><br>
                    L’association agit pour l’égalité des droits, la citoyenneté, la participation sociale et le libre choix du mode de vie des personnes en situation de handicap et de leur famille.
                </span>
              </div>
              <br>
            </a>
          </div>
        </b-container>

        <div class="row ligne"></div>
        <b-container>
          <div class="row paragraphe">
            <h2 style="color: #6ec8cb">CONTACT</h2>
          </div>
        </b-container>
        <b-container>
          <div class="row paragraphe">
            <div class="wrapper">
              <a href="https://www.apf-francehandicap.org/" class="icon apf">
                <div class="tooltip">APF FRANCE</div>
                <span><i class="bi bi-globe2"></i></span>
              </a><a href="https://www.facebook.com/associationdesparalysesdefrance" class="icon facebook">
              <div class="tooltip">Facebook</div>
              <span><i class="fab fa-facebook-f"></i></span>
            </a>
              <a href="https://twitter.com/apfhandicap?lang=fr" class="icon twitter">
                <div class="tooltip">Twitter</div>
                <span><i class="fab fa-twitter"></i></span>
              </a>
              <a href="https://www.linkedin.com/company/apfhandicap/" class="icon linkedin">
                <div class="tooltip">Linkedin</div>
                <span><i class="bi bi-linkedin"></i></span>
              </a>
              <a href="https://www.youtube.com/user/APFhandicap" class="icon youtube">
                <div class="tooltip">Youtube</div>
                <span><i class="fab fa-youtube"></i></span>
              </a>
            </div>
          </div>
        </b-container>
        <br><br>
    </b-container>




</template>

<script>
export default {
  name: "associationVue",
  data:() => ({
    layoutHeight: "margin-top : "+51+"px"
  })
}
</script>

<style>
@import '../../../public/css/association/association.css';
</style>