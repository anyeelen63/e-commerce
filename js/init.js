const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//Se crea la funcion getUser para llamar al localStorage
//se obtiene el dato del email ingresado y pregunta si es vacio o undefined, lo setea con 
//el usuario ingresado. Si no hay nada, redirige al login
function getUser(){
  let Usuario = localStorage.getItem("Usuario");
  if(Usuario!=undefined && Usuario!=""){
    document.getElementById("Usuario").innerHTML +=""
    +Usuario;
    return(Usuario);
  }
  else{
    window.location.href="./login.html"
  }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  getUser();
})

document.getElementById("cerrarSesion").addEventListener("click", function(e){
  localStorage.removeItem("Usuario");
  window.location.href=".index.html";
})
 //Función que se ejecuta una vez que se haya lanzado el evento de
  //que el documento se encuentra cargado, es decir, se encuentran todos los
  //elementos HTML presentes.
      //se llama a la funcion