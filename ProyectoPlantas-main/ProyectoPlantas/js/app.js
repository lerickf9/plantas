const carrito = document.getElementById('carrito');
const plantas = document.getElementById('lista-planta');
const listaPlantas = document.querySelector('#lista-carrito tbody');
const btnAgregarPlanta = document.querySelectorAll('#lista-planta .agregar-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

/*

    $(function(){
        $("#lista-planta .agregar-carrito").click(function(e){
            e.preventDefault();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${planta.imagen}" width=100>
                </td>
                <td>${planta.titulo}</td>
                <td>${planta.precio}</td>
                <td>
                    <a href="#" class="borrar-planta" data-id="${planta.id}">X</a>
                </td>
            `;
            $('#lista-carrito tbody').append(row);
        });
        $('#lista-carrito tbody .btn-borrar').click(function(e){
            e.preventDefaul();
            $(this).parent('tr').remove();
        });
    })
*/

function cargarEventListeners () {
    for(var i = 0; i < btnAgregarPlanta.length; i++){
        btnAgregarPlanta[i].addEventListener('click', comprarPlanta);
        btnAgregarPlanta[i].dataset.id = i;
    }
    //carrito.addEventListener('click', eliminarPlanta);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarPlanta(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const planta = e.target.parentElement.parentElement;
        console.log({planta});
        leerDatosPlanta(planta);
    }
}

function leerDatosPlanta(planta){
    const infoPlanta = {
        imagen: planta.querySelector('img').src,
        titulo: planta.querySelector('h4').textContent,
        precio: planta.querySelector('.precio span').textContent,
        id: planta.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoPlanta);
}

function insertarCarrito(planta){
    const row = document.createElement('tr');
    row.setAttribute("id", "planta-"+planta.id );
    row.innerHTML = `
        <td>
            <img src="${planta.imagen}" width=100>
        </td>
        <td>${planta.titulo}</td>
        <td>${planta.precio}</td>
        <td>
            <a href="#" class="borrar-planta" onClick="eliminarPlanta(${planta.id})" data-id="${planta.id}">X</a>
        </td>
    `;
    listaPlantas.appendChild(row);
    guardarPlantaLocalStorage(planta);
}

function eliminarPlanta(id){
    const row = document.getElementById('planta-'+id);
    row.parentNode.removeChild(row);
    eliminarPlantaLocalStorage(id);
}

function vaciarCarrito(){
    while(listaPlantas.firstChild){
        listaPlantas.removeChild(listaPlantas.firstChild);
    }

    vaciarLocalStorage();
    return false;

}

function guardarPlantaLocalStorage(planta){
    let plantas;
    plantas = obtenerPlantasLocalStorage();
    plantas.push(planta);
    localStorage.setItem('plantas', JSON.stringify(plantas))
}

function obtenerPlantasLocalStorage(){
    let plantasLS;

    if(localStorage.getItem('plantas') === null){
        plantasLS = [];
    } else {
        plantasLS = JSON.parse(localStorage.getItem('plantas'))
    }
    return plantasLS;
}

function leerLocalStorage(){
    let plantasLS;

    plantasLS = obtenerPlantasLocalStorage();

        plantasLS.forEach(function(planta) {
            const row = document.createElement('tr');
            row.setAttribute("id", "planta-"+planta.id );
            row.innerHTML = `
            <td>
                <img src="${planta.imagen}" width=100>
            </td>
            <td>${planta.titulo}</td>
            <td>${planta.precio}</td>
            <td>
                <a href="#" class="borrar-planta" onClick="eliminarPlanta(${planta.id})" data-id="${planta.id}">X</a>
            </td>
        `;
        listaPlantas.appendChild(row);
    });
}

function eliminarPlantaLocalStorage(id){
    let plantasLS;

    plantasLS = obtenerPlantasLocalStorage();

    plantasLS.forEach(function(obj, index){
        if(obj.id.toString() === id.toString()){
            plantasLS.splice(index, 1);
        }
    });

    localStorage.setItem('plantas', JSON.stringify(plantasLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}
