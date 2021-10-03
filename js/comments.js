var comments = [];

function saveComment(){
    let date = new Date();
    let formatDate = date.getDate().toString().padStart(2,'0') + "/" 
    + (date.getMonth()+1).toString().padStart(2,'0') + "/" 
    + date.getFullYear().toString() + "  " + date.getHours() + ":" 
    + date.getMinutes();
    comment = {
        message: document.getElementById("textarea").value,
        completeDate: formatDate,
        score: document.getElementById("score").value,
        user: localStorage.getItem("Usuario")
    }
    comments.push(comment);
    showComment();
}

function drawStars(stars){
    let number = parseInt(stars);
    let html="";

    for (let i=1; i<=number; i++){
        html +=`<span class= "fa fa-star checked"></span>`
    }
    for (let j=number+1;j<=5;j++){
        html+=`<span class= "fa fa-star"></span>`
    }
    return html;
}

function showComment(){
    let htmlContentToAppend = ""

    for(let i = comments.length -1; i>=0; i--){
        let comment = comments[i];

        htmlContentToAppend += `
        <div class="media-list">
        <div class="media">
            <a href="#" class="pull-left">
                <img src="https://static.uc.ltmcdn.com/img/web/fake-user.png" alt="100" class="rounded-circle">
            </a>
            <div class="media-body">
                <strong class="text-danger">`+ comment.user+`</strong>
                <span class="text-muted pull-right">
                <small class="text-muted">${drawStars(comment.score)}</small>
            </span>
                <dt>`+comment.message+`</dt>
                <p> `+comment.completeDate+`</p>
            </div>
        </div>
        </div>
        `
    }
    document.getElementById("comentarios").innerHTML += htmlContentToAppend;
    document.getElementById("formulario").reset();
}