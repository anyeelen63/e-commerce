let Carrito = [];

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
        <td><input type="number" min="1" value=${article.count} 
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
        updateTotal()
    })
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

