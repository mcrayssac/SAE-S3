var map = document.querySelector('#map')
var paths = document.querySelectorAll('.map_image a')
var links = document.querySelectorAll('.map_list a')
var selects = document.querySelectorAll('.map_list select')

var selectAreas = (id) => {
    map.querySelectorAll('.is-active').forEach(element => {
        element.classList.remove('is-active')
    })

    if(id !== undefined){
        document.querySelector('#list-' + id).classList.add('is-active')
        document.querySelector("#" + id).classList.add('is-active')
        console.log(document.querySelector('#list-' + id))
        console.log(document.querySelector("#" + id))  
    }
}

var selectGroup = (id) =>{
    //désactiver si certains étaient resté actif
    map.querySelectorAll('.is-active').forEach(element => {
        element.classList.remove('is-active')
    })

    if(id !== ""){
        //ajoute la classe actif à l'option correspondant à l'id
        document.querySelector('#list-' + id).classList.add('is-active')
        //créer le tableau avec tout les élements de dessins qui correspondent à la catégorie de id
        let tabFiltre = document.querySelectorAll('.map_image a .'+id)
        //parcours les options selectionné
        tabFiltre.forEach(standSelectionne =>{
            standSelectionne.classList.add('is-active')
        })
    }
}



paths.forEach(path => {
    path.addEventListener('mouseenter', e => {
        console.log(e.target.id)
        var id = e.target.id
        console.log(id)
        // selectAreas(id)
    })

    path.addEventListener('mouseleave', () => {
        selectAreas()
    })
})

links.forEach(link =>  {
    link.addEventListener('mouseenter', e => {
        var id = e.target.id.replace("list-", "")
        console.log(id)
        selectAreas(id)
    })
    link.addEventListener('mouseleave', () => {
        selectAreas()
    })
})

selects.forEach(select => {
    console.log(selects)
    select.addEventListener('change', e=>{
        var id= e.target.value.replace("list-", "")
        console.log(id)
        selectGroup(id)
    })
})



