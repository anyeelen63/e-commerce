var productsArray = [];

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
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productsArray = resultObj.data;
                showProductsList(productsArray);
        }
    });
});