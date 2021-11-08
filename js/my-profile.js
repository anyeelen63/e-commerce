//recupero la ID de foto
//con la variable file recupero el input y el file que tenga cargado 
//uso el 0 para seleccionar el primer elemento de los que se hayan cargado
//con el objeto FileReader se manipulan los archivos. Se crea con new y se genera el objeto.
//si hay data cargada en file, se la seteo a reader con AsDataURL y le paso el file por parámetro
//si se cargó algo, se ejecuta onloadend una vez cargada la imagen
//se ejecuta el evento y al preview le seteo lo que quedó en el reader con .result
//esto se ejecuta en el onchange del input


function previewFile(){
    let preview= document.getElementById('foto');
    let file = document.getElementById('inputF').files[0];
    let reader = new FileReader();

    if (file){
        reader.readAsDataURL(file);
    }
    else{
        preview.src= "img/icon_person_0.png";
    }
    reader.onloadend = function(){
        preview.src = reader.result;
    }
}

//defino una variable perfil como campo vacío
//a cada valor del input le asigno un valor en perfil. .value recupera el valor de c/u
//guardo en local storage con setItem, defino la key con que lo voy a guardar (usuario)
//uso JSON.stringify para pasar a texto los datos que ingresan, por parametro le paso el objeto perfil  
//alert para mostrar que se guardaron los datos
//redirigimos al html de perfil para que aparezca la tarjeta de usuario con los datos

function guardar(){
    let preview = document.getElementById('foto');
    let perfil = {};

perfil.primerNombre = document.getElementById('primerNombre').value
perfil.segundoNombre = document.getElementById('segundoNombre').value
perfil.primerApellido = document.getElementById('primerApellido').value
perfil.segundoApellido = document.getElementById('segundoApellido').value
perfil.email = document.getElementById('email').value
perfil.telefono = document.getElementById('telefono').value
perfil.imagen = preview.src

localStorage.setItem('usuario', JSON.stringify(perfil));
alert ("Perfil guardado")

window.location.href="./Perfil.html";
}

//para recuperar los datos del html usamos DOM
//defino donde guardar los datos que vienen de localStorage
//la seteo con los datos que trae el localStorage
//voy al localstorage con getitem recupero la key
//me devuelve lo que hay en la key, que es un texto en formato JSON
//para poder manipularlo en JS uso JSON.parse
//asi todo el texto que le paso como parametro lo transforma en registro
 //si perfil es distinto de null, porque no tengo datos guardados en localstorage   
 //recupero los datos en el input

document.addEventListener('DOMContentLoaded', function(e){

let preview = document.getElementById('foto');
    let perfil = JSON.parse(localStorage.getItem('usuario'));
    if (perfil != null){

        document.getElementById('primerNombre').value = perfil.primerNombre;
        document.getElementById('segundoNombre').value = perfil.segundoNombre;
        document.getElementById('primerApellido').value = perfil.primerApellido;
        document.getElementById('segundoApellido').value  = perfil.segundoApellido;
        document.getElementById('email').value = perfil.email;
        document.getElementById('telefono').value = perfil.telefono;
        document.getElementById('foto').src = perfil.imagen;

        let nombreCompletoHTML  = document.getElementById("nombreCompleto");
        nombreCompletoHTML.innerHTML = perfil.primerNombre + " " + perfil.segundoNombre;

        let apellidoCompletoHTML  = document.getElementById("apellidoCompleto");
        apellidoCompletoHTML.innerHTML = perfil.primerApellido + " " + perfil.segundoApellido;

        let emailUsuarioHTML  = document.getElementById("emailUsuario");
        emailUsuarioHTML.innerHTML = perfil.email;

        let telefonoUsuarioHTML  = document.getElementById("telefonoUsuario");
        telefonoUsuarioHTML.innerHTML = perfil.telefono;
    }
    else{
        preview.src =  "img/icon_person_0.png";
    }
})
