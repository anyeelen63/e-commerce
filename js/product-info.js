var product = {};
var comentarios = [];
let products = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `

        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showCommentProducts(){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < comentarios.length; i++){
        let comments = comentarios[i];
        
        htmlContentToAppend += `

        <div class="media-list">
        <div class="media">
            <a href="#" class="pull-left">
                <img src="https://static.uc.ltmcdn.com/img/web/fake-user.png" alt="100" class="rounded-circle">
            </a>
            <div class="media-body">
                <strong class="text-danger">`+ comments.user+`</strong>
                <span class="text-muted pull-right">
                <small class="text-muted">${drawStars(comments.score)}</small>
            </span>
                <dt>`+comments.description+`</dt>
                <p> `+comments.dateTime+`</p>
            </div>
        </div>
        </div>
        `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}

function mostrarRelacionados(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let relatedProducts = array[i];
        htmlContentToAppend += `

        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="${products[relatedProducts].imgSrc}" alt="${products[relatedProducts].description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${products[relatedProducts].name}</h4>
                    <small class="text-muted"> Precio: ${products[relatedProducts].cost}${products[relatedProducts].currency}</small>
                </div>
                <p class="mb-1">${products[relatedProducts].description}</p>
            </div>
        </div>
    </a>
        `

        document.getElementById("relacionados").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            showImagesGallery(product.images);

            getJSONData(PRODUCTS_URL).then(function(result){
                if (result.status === "ok")
                {
                    products = result.data;
                    mostrarRelacionados(product.relatedProducts)
                }
            });
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj.data;

            showCommentProducts();
        }
    });
});

