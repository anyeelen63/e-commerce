var product = {};
var comentarios = [];

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
                <img src="https://static.uc.ltmcdn.com/img/web/fake-user.png" alt="100" class="img-circle">
            </a>
            <div class="media-body">
                <strong class="text-success">`+ comments.user+`</strong>
                <span class="text-muted pull-right">
                <small class="text-muted">${drawStars(comments.score)}</small>
            </span>
                <p>`+comments.description+`</p>
                <dt> `+comments.dateTime+`</dt>
            </div>
        </div>
        </div>

                `
                document.getElementById("comentarios").innerHTML = htmlContentToAppend;
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
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj.data;

            showCommentProducts();
        }
    });
});

