let productosCarrito = []

function showCarrito(){
    let htmlContentToAppend = "";

    //recorro el arreglo de productos extraigo nombre, moneda, costo por unidad, 
    //el input de la cantidad, agregando el index al id de json 
    //al valor se le agrega el count, con cuantos productos se arranca
    //con onchange se llama a la funcion update 
    //finalmente se hace el costo por la cantidad que viene por defecto 
    for(let i = 0; i < article.length; i++){
        htmlContentToAppend += `
        
        <tr>
        <td> <img class="img-fluid" style="max-width:50px" src="${article[i].src}"></td>
        <td>${article[i].name}</td>
        <td>${article[i].currency}</td>
        <td>${article[i].unitCost}</td>
        <td><input id="cantidad${i}" type="number" 
        value="${article[i].count}" onchange="updateSubtotal()"></td>
        <td id="subtotal${i}">${article[i].unitCost * article[i].count}</td>
        </tr>
        `;
    }
        //para mostrar los productos insercion por innerhtml
    document.getElementById("insertCarrito").innerHTML += htmlContentToAppend;
}
//variables de costo y cantidad para cada producto
//toma el costo como el costo unitario que viene por json
//la cantidad la toma del input
//if para que la cantidad menor a 0 la reasigne a 1
//llama al subtotal y le cambia el valor por la multiplicacion de costo*cantidad
//el id subtotal puntualizado con el i para que cada id sea unico, a medida que el id avanza

function updateSubtotal(){
    let costo = 0;
    let cantidad = 0;
    for(let i = 0; i < article.length; i++){
        costo=article[i].unitCost;
        cantidad= document.getElementById("cantidad"+i+"").value;
        if (cantidad<=0){
            document.getElementById("cantidad"+i+"").value = 1;
        }
        else{
            document.getElementById("subtotal"+i+"").innerText = costo*cantidad;
        }
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        article = resultObj.data.articles;
        showCarrito();
        updateSubtotal();
    })
})
