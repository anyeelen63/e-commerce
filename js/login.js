document.addEventListener("DOMContentLoaded", function(e){
});

    function validar(){ 
        let nombre = document.getElementById("nombre").value;
         let pass = document.getElementById("pass").value;
         
         if (nombre.length < 8 || nombre.length >20 ) {
        alert('El usuario debe estar entre 8 y 20 caracteres');
        return;
    }
        
        if(pass.length < 8 || pass.length >20 ) {
        alert('La clave debe estar entre 8 y 20 caracteres');
        return;
    }
      //valida el ingreso de caracteres, de 8 a 20 por defecto, 
      //si no se cumple salta un alert y vuelve a empezar
    if((nombre !=="")&& (pass!=="")){
        window.location.href="./products.html";
        //redirige al html de product con ./ porque esta en otra carpeta 
    }
    else{
        alert("debe completar los campos");
    }    
}