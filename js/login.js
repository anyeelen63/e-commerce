document.addEventListener("DOMContentLoaded", function(e){
});

    function validar(){ 
        let Usuario = document.getElementById("Usuario").value;
        let Password = document.getElementById("Password").value;
         
         if (Usuario.length < 8 || Usuario.length >20 ) {
        alert('El usuario debe tener entre 8 y 20 caracteres');
        return;
    }
        if(Password.length < 8 || Password.length >20 ) {
        alert('La contraseña debe tener entre 8 y 20 caracteres');
        return;
    }
    if((Usuario !=="")&& (Password!=="")){
        setUser();
        window.location.href="./products.html";

    }
    else{
        alert("debe completar los campos");
    }    

}
function setUser(){
    let Usuario = document.getElementById("Usuario").value;
    localStorage.setItem("Usuario", Usuario);
}
//Se crea la funcion para guardar el usuario, se le asigna un nombre y se le ingresa el valor

