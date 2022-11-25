var map = document.querySelector('#map')
var paths = document.querySelectorAll('.map_image a')
var links = document.querySelectorAll('.map_list a')


var selectAreas = (id) => {
    map.querySelectorAll('.is-active').forEach(element => {
        element.classList.remove('is-active')
    })

    if(id !== undefined){
        document.querySelector('#list-' + id).classList.add('is-active')
        
        let tabFiltre = document.querySelectorAll('.map_image a .'+id)
        console.log(tabFiltre)
        if(tabFiltre.length>0){
            tabFiltre.forEach(standSelectionne =>{
                standSelectionne.classList.add('is-active')
            })
        }else{
            document.querySelector("#" + id).classList.add('is-active')
        }
        
        console.log(document.querySelector('#list-' + id))
        console.log(document.querySelector("#" + id))
        
    }

}

paths.forEach(path => {
    path.addEventListener('mouseenter', e => {
        console.log(e.target.id)
        var id = e.target.id
        console.log(id)
        selectAreas(id)
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

