const ORDER_ASC_BY_PROD_COST = "Cost↑";
const ORDER_DESC_BY_PROD_COST = "Cost↓";
const ORDER_DESC_BY_PROD_SOLD = "SoldC";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//se crean variables globales para currentProductsArray, CurrentSortCriteria y minimo y maximo
//todas undefined
//Se crean constantes para los criterios de orden, con flecha para identificar

//se crea la función sortProducts y se pasan como criterio el orden descendente por cant.vendida
//ascendente por precio y descendente por precio
//no eran strings asi que no debio usarse parseInt

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PROD_COST){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PROD_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }
    return result;
}

//en ShowProductList se cambian los valores del for por las variables de productsArray
//Se establece el filtro para min y maximo, se pasan los valores de productcost a entero
//para que pueda compararlos

function showProductsList(){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
       
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){


            htmlContentToAppend += `
            <a href="product-info.html" class="card-list-group-item card-list-group-item-action col-sm-12 col-md-4 col-lg-5">

            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-fluid">
            <h4 class="mb-1">`+ product.name +`</h4>
            <p class="mb-1">` + product.description + `</p>
            <span class="price-tag-amount" aria-hidden="true">
            <span class="price-tag-symbol">` + product.currency  + `</span>
            <span>` + product.cost + `</span>
            </span>
            </a>
                    `
                }        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
     }
}

//se crea sortAndShowProducts para ordenar la lista
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
    
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

//se invoca a sortAndShowProducts definido anteriormente, pasando por parámetro el
//criterio de ordenamiento por defecto en precio ascendente. 
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PROD_COST, resultObj.data);
        }
    });
//Se llaman los id del html para asignarle la función de sortAndShowProducts 
//con los criterios personalizados para cada uno
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PROD_COST);
    });
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PROD_COST);
    });
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PROD_SOLD);
    });
//Se llama el id para limpiar filtro y los id de los valores de entrada para
//asignarles valor nulo y mostrar la lista original
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
//Se llama el id de filtro por precio asignado en el html de products y se le asigna la funcion
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
//Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
//de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
//Muestra el listado con los filtros aplicados
});
