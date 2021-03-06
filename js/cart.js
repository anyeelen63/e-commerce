let Carrito = [];
let comissionPercentage = 0.05;
let MONEY_SYMBOL = "$";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
let numeroTarjeta = document.getElementById('numeroTarjeta');
let vencimiento = document.getElementById('vencimiento');
let cvc = document.getElementById('cvc');
let nombreTitular = document.getElementById('nombreTitular');
let recordarTarjeta = document.getElementById('recordarTarjeta');
let cuentaOrigen = document.getElementById('cuentaOrigen')
let titularDestino = document.getElementById('titularDestino')
let inputGroupSelect01 = document.getElementById('inputGroupSelect01')
let inputGroupSelect02 = document.getElementById('inputGroupSelect02')
let numeroDestino = document.getElementById('numeroDestino')


function selectPayForm(obj){
    document.getElementById('tarjetaCredito').addEventListener('click', function(e) {
        cuentaOrigen.value = "";
        titularDestino.value = "";
        inputGroupSelect01.value = "";
        inputGroupSelect02.value = "";
        numeroDestino.value = "";

        numeroTarjeta.disabled = false;
        vencimiento.disabled = false;
        cvc.disabled = false;
        nombreTitular.disabled = false;
        recordarTarjeta.disabled = false;

        cuentaOrigen.disabled = true;
        titularDestino.disabled = true;
        inputGroupSelect01.disabled = true;
        inputGroupSelect02.disabled = true;
        numeroDestino.disabled = true;
  });
      document.getElementById('transferenciaBancaria').addEventListener('click', function(e) {
        numeroTarjeta.value = "";
        vencimiento.value = "";
        cvc.value = "";
        nombreTitular.value = "";
        recordarTarjeta.value = "";
        
        numeroTarjeta.disabled = true;
        vencimiento.disabled = true;
        cvc.disabled = true;
        nombreTitular.disabled = true;
        recordarTarjeta.disabled = true;

        cuentaOrigen.disabled = false;
        titularDestino.disabled = false;
        inputGroupSelect01.disabled = false;
        inputGroupSelect02.disabled = false;
        numeroDestino.disabled = false;
  });
}
    


function validateModal(){

        if (numeroTarjeta.value === '' && numeroTarjeta.disabled === false) {
            alert('Ingresar: Número de tarjeta')
        }
        if (vencimiento.value === '' && vencimiento.disabled === false) {
            alert('Ingresar: Vencimiento')
        }
        if (cvc.value === '' && cvc.disabled === false) {
            alert('Ingresar CVC')
        }
        if (nombreTitular.value === '' && nombreTitular.disabled === false) {
            alert('Ingresar: Nombre titular')
        }

            if (cuentaOrigen.value === '' && cuentaOrigen.disabled === false) {
                alert('Ingresar: Cuenta de origen')
            }
            if (titularDestino.value === '' && titularDestino.disabled === false) {
                alert('Ingresar: Titular de cuenta destino')
            }
            if (inputGroupSelect01.value === '' && inputGroupSelect01.disabled === false) {
                alert('Debe seleccionar banco')
                inputGroupSelect01.focus();
            }
            if (inputGroupSelect02.value === '' && inputGroupSelect02.disabled === false) {
                alert('Debe seleccionar tipo de cuenta')
                inputGroupSelect02.focus();
            }
            if (numeroDestino.value === '' && numeroDestino.disabled === false) {
                alert('Ingresar: Número de cuenta destino')
            }
        ;
    ;

}


//funcion para actualizar el subtotal. se pasa como parametro cantidad,costo, id donde se 
//quiere insertar el subtotal. con getElement ponemos donde queremos insertar el subtotal
//actualizado
//se llama a la función updateTotal
function updateSubtotal(cantidad, costo, id){
    document.getElementById(id).innerHTML = cantidad*costo;
    updateTotal();
}

//declarar variable index inicializada en 0
//se le va sumando 1 a index en cada iteración, se guarda el id para llamarlo luego
//en el onchange se llama a la funcion de updateSubtotal() con sus parametros
//se usa this.value para darle el valor del elemento actual
//se retoma el id para actualizar el valor del subtotal
function showCarrito(){
    let index =0;
    let htmlContentToAppend = "";

    for(let article of Carrito){
        index++;
        id=index;
        let subtotal = parseInt(article.count) * parseInt(article.unitCost);
        htmlContentToAppend += `
        
        <tr>
        <td> <img class="img-fluid" style="max-width:60px" src="${article.src}"></td>
        <td>${article.name}</td>
        <td>${article.currency} </td>
        <td>${article.unitCost}</td>
        <td><input id="productCost" type="number" min="1" value=${article.count} 
        onchange="updateSubtotal(this.value, ${article.unitCost}, ${id})"></td>
        <td id="${id}" class="subtotal">${subtotal}</td>
        </tr>
        `
    }

        document.getElementById("carrito").innerHTML = htmlContentToAppend;

}



//peticion a URL de CART_INFO para mostrar en HTML los elementos gráficos
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        Carrito = resultObj.data.articles;
    
        showCarrito();
        updateTotalCosts();
    })

    document.getElementById("Premium").addEventListener("change", function(){
        comissionPercentage = 0.15;
        updateTotalCosts();
    });
    
    document.getElementById("Express").addEventListener("change", function(){
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("Estandar").addEventListener("change", function(){
        comissionPercentage = 0.05;
        updateTotalCosts();
    });

})


//se setea el total en 0 para que se reinicie el valor
//iterar en la coleccion de elementos que usen la clase subtotal
//se van sumando los subtotales
//se insertan en html
function updateTotal(){
    let total = 0;
    let subtotales = document.getElementsByClassName("subtotal");
    for (let iterator of subtotales){
        total += parseInt(iterator.innerHTML);
    }
    document.getElementById("total").innerHTML= "$" + total;
    document.getElementById("subtotal").innerHTML = "$" + total;
}

function updateTotalCosts(){

    let subtotalHTML = document.getElementById("subtotal");
    let comisionHTML = document.getElementById("comision");
    let totalHTML = document.getElementById("total");

    let subtotal = 0;
    let subtotales = document.getElementsByClassName("subtotal");
    for (let iterator of subtotales){
        subtotal += parseInt(iterator.innerHTML);
    }
    document.getElementById("subtotal").innerHTML = "$" + subtotal;

    let comissionToShow = Math.round(comissionPercentage * parseInt(subtotal));
    let totalCostToShow = (parseInt(subtotal) + comissionToShow);

    subtotalHTML.innerHTML = MONEY_SYMBOL + subtotal;
    comisionHTML.innerHTML = MONEY_SYMBOL + comissionToShow;
    totalHTML.innerHTML = MONEY_SYMBOL + totalCostToShow;
}



   //Se obtiene el formulario de publicación de producto
   var sellForm = document.getElementById("sell-info");

   //Se agrega una escucha en el evento 'submit' que será
   //lanzado por el formulario cuando se seleccione 'Vender'.
   sellForm.addEventListener("submit", function(e){

       let validationCustom01Input = document.getElementById("validationCustom01");
       let validationCustom02Input = document.getElementById("validationCustom02");
       let validationCustom03Input = document.getElementById("validationCustom03");
       let infoMissing = false;

       //Quito las clases que marcan como inválidos
       validationCustom01Input.classList.remove('is-invalid');
       validationCustom02Input.classList.remove('is-invalid');
       validationCustom03Input.classList.remove('is-invalid');


       //Se realizan los controles necesarios,
       //En este caso se controla que se haya ingresado el nombre y categoría.
       //Consulto por el nombre del producto
       if (validationCustom01Input.value === "")
       {
        validationCustom01Input.classList.add('is-invalid');
           infoMissing = true;
       }

       if (validationCustom02Input.value === "")
       {
        validationCustom02Input.classList.add('is-invalid');
           infoMissing = true;
       }

       if (validationCustom03Input.value === "")
       {
        validationCustom03Input.classList.add('is-invalid');
           infoMissing = true;
       }
       
       if(!infoMissing)
       {
           //Aquí ingresa si pasó los controles, irá a enviar
           //la solicitud para crear la publicación.

           getJSONData(CART_BUY_URL).then(function(resultObj){
               let msgToShowHTML = document.getElementById("resultSpan");
               let msgToShow = "";
   
               //Si la publicación fue exitosa, devolverá mensaje de éxito,
               //de lo contrario, devolverá mensaje de error.
               if (resultObj.status === 'ok')
               {
                   msgToShow = resultObj.data.msg;
                   document.getElementById("alertResult").classList.add('alert-success');
               }
               else if (resultObj.status === 'error')
               {
                   msgToShow = ERROR_MSG;
                   document.getElementById("alertResult").classList.add('alert-danger');
               }
   
               msgToShowHTML.innerHTML = msgToShow;
               document.getElementById("alertResult").classList.add("show");
           });
       }

       //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
       if (e.preventDefault) e.preventDefault();
           return false;
   });
