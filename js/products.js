var productsArray = [];
// se crea la variable de products array para poder utilizarla localmente
function showProductsList(array){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos </small>
                            <small class="text-muted">` + product.cost + product.currency + ` </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
     }
    //  se obtienen los elementos del listado de productos
}
// se utilizo el codigo de categories, 
// se cambiaron los atributos de entrada segun lo contenido en en json
// se cambio lo relacionado a cat por prod

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productsArray = resultObj.data;
                showProductsList(productsArray);
        }
    });
});
// se llama al json de products para mostrar el listado de productos