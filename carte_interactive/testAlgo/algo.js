let tabCords = [{x:193,y:117},{x:147,y:147},{x:84,y:50, r:-60},{x:149,y:95, r:-90}, {x:88, y:92, r:-11}, {x:100, y:10, r:-15}, {x:100, y:10}  ]

function createRect(){
    let svgT = document.getElementsByTagName("svg");
    var svgNS = svgT[0].namespaceURI;

    tabCords.forEach(stand =>{    
        
        //pour les a
        var a= document.createElementNS(svgNS,'a');
        a.setAttribute('xlink:title','test'); // à modifier en fonction bdd
        a.setAttribute('id', 'test'); // à modifier en fonction bdd
        a.setAttribute('class', 'clubs'); // à modifier en fonction bdd
        a.setAttribute('data-toggle','modal')
        a.setAttribute('data-target','#modalPopUp')      

        //Pour les stands
        var rect = document.createElementNS(svgNS,'rect');
        console.log(stand.x + " "  + stand.y)
        rect.setAttribute('x',stand.x);
        rect.setAttribute('y',stand.y);
        rect.setAttribute('width',6);
        rect.setAttribute('height',5);
        rect.setAttribute('fill','#95B3D7'); // couleur à modifier
        if(stand.hasOwnProperty('r')){
            rect.setAttribute('transform','rotate('+stand.r+','+stand.x+', '+stand.y + ')');
        }
        a.appendChild(rect);
        
        console.log(document.getElementsByTagName("svg"))

        //pour les balises
        //rajouter un if pour choisir la bonne image en fonction resto/club...
        var balise = document.createElementNS(svgNS,'image');
        balise.setAttribute('width','9.7')
        balise.setAttribute('height','15')
        balise.setAttribute('preserveAspectRatio','none')
        balise.setAttribute('href','apf1.png') // a modifier selon type de prestataire
        balise.setAttribute('id','dfghj') //à modifier en fonction bdd
        if(stand.hasOwnProperty('r')){
            balise.setAttribute('x',3*Math.cos(deg_to_rad(stand.r)) - 2.5*Math.sin(deg_to_rad(stand.r)) +stand.x-9.7/2)
            balise.setAttribute('y',3*Math.sin(deg_to_rad(stand.r)) + 2.5*Math.cos(deg_to_rad(stand.r)) +stand.y-14)
        }
        else{
            balise.setAttribute('x',stand.x+(6/2)-(9.7/2))
            balise.setAttribute('y',stand.y+5/2-14)
        }
        a.appendChild(balise);
        svgT[0].appendChild(a);


        //Pour les filtres : rajouter une boucle sur les caractéristiques (sportCO, raquettess...)
        //tester si le stand a la caractéristiQ
        //si oui: ajouter
        //a.setAttribute('class','caractéristiQCorrespondant')
        //rect.setAttribute('class','caractéristiQCorrespondant')  
        
        
    })
}

function deg_to_rad(degree){
    return (degree*Math.PI)/180
}


