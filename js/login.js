document.addEventListener("DOMContentLoaded", function(e){
});

    function validar(){ 
        let Email = document.getElementById("Email").value;
        let Password = document.getElementById("Password").value;
         
         if (Email.length < 8 || Email.length >20 ) {
        alert('El usuario debe estar entre 8 y 20 caracteres');
        return;
    }
        //validacion del Email segun el largo
        if(Password.length < 8 || Password.length >20 ) {
        alert('La clave debe estar entre 8 y 20 caracteres');
        return;
        //validacion de la contraseña segun el largo
    }
      //valida el ingreso de caracteres, de 8 a 20 por defecto, 
      //si no se cumple salta un alert y vuelve a empezar
    if((Email !=="")&& (Password!=="")){
        window.location.href="./products.html";
        //redirige al html de product con ./ porque esta en otra carpeta
        //se ejecuta con el onclick
    }
    else{
        alert("debe completar los campos");
    }    
    //alerta para el ingreso de campos vacios
}