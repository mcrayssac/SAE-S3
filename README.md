# SAE S3 : APPLICATION WEB SUR UN FESTIVAL SPORTIF

## *En quoi consiste ce projet ?* 
&nbsp;&nbsp;&nbsp;&nbsp;Création d'une application réalisée selon des principes de conception actuels du Web, à savoir avec une partie visuelle côté navigateur (front-end) écrite en Javascript grâce au framework vuejs, une partie base de données implémentée grâce à un serveur de type MySQL, une partie serveur écrite en nodejs, qui fait l'interface entre le navigateur et la BdD, sous la forme d'une API REST et qui sert également à envoyer le code javascript créé en vuejs au navigateur (comme un serveur web).

&nbsp;&nbsp;&nbsp;&nbsp;Cette organisation permet au navigateur, au travers des interactions de l'utilisateur avec l'interface graphique de l'application, d'envoyer des requêtes au serveur API. En fonction du type de requête et des données associées (en principe des objets JSON) le serveur API va exécuter certaines instructions permettant de mettre à jour la base de données, et/ou d'en extraire des informations pour produire de nouvelles données envoyées au navigateur. Ce dernier les utilise pour mettre à jour l'interface graphique.
