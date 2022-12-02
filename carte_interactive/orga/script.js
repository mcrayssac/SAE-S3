var map = document.querySelector('#map')
var paths = document.querySelectorAll('.map_image a')
var links = document.querySelectorAll('.map_list a')
var buttonsEspace = document.querySelectorAll('.map_list .espace')
var allCheckbox = document.querySelectorAll('input[type=checkbox]')
var selectContraintes = document.querySelector('input[value=Valider]')
var resetContraintes = document.querySelector('input[value=Reset]')

console.log(selectContraintes)

// Permet d'enlever toutes les cases cochées en reloadant la page
allCheckbox.forEach(b => {
    b.checked = false
})

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

paths.forEach(path => {
    path.addEventListener('mouseenter', e => {
        console.log(e.target.id)
        var id = e.target.id
        selectAreas(id)
    })

    path.addEventListener('mouseleave', () => {
        selectAreas()
    })
})


links.forEach(link =>  {
    link.addEventListener('mouseenter', e => {
        var id = e.target.id.replace("list-", "")
        selectAreas(id)
    })

    link.addEventListener('mouseleave', () => {
        selectAreas()
    })
})

buttonsEspace.forEach(button => {
    button.addEventListener('click', () => {
        if(button.checked){
            buttonsEspace.forEach(b => {
                b.checked = false
            })
            button.checked = true
        }
        else{
            button.checked = true
        }
    })
})


selectContraintes.addEventListener('click', () => {
    map.querySelectorAll('.is-active').forEach(element => {
        element.classList.remove('is-active')
    })

    allCheckbox.forEach(button => {
        if(button.checked){
            var id = button.id
            console.log(id)
            let tabFilters = document.querySelectorAll('.map_image a .'+id)
            
            tabFilters.forEach(standSelectionne =>{
                standSelectionne.classList.add('is-active')
                console.log(standSelectionne)
            })
        }
    })
})

resetContraintes.addEventListener('click', () => {
    allCheckbox.forEach(b => {
        b.checked = false
    })
    selectAreas()
})

$('#modalPresta').on('show.bs.modal', function (e) {
    console.log("hello")
    $('#modalPresta').addClass("open");
}).on('hide.bs.modal', function (e) {
    $('#modalPresta').removeClass("open");
})