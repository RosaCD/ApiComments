fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(usuario => {
        let menu=document.getElementById("usuarios");
        menu.innerHTML='';
        for (let i = 0; i < usuario.length; i++) {
            menu.innerHTML += `<option value='${usuario[i].id}'>
                ${usuario[i].username}
            </option>`;
            
        }
        console.log(usuario[1])
        console.log(menu.value);
        ;
               
});

let menu=document.getElementById("usuarios");
menu.addEventListener('change',function () {
    console.log('Seleccionaste:', menu.value);
    fetch (`https://jsonplaceholder.typicode.com/users/${menu.value}/posts`)
        .then(response => response.json())
        .then(post =>{
            console.log(post.length);
            
            let divpost = document.getElementById("post");
            let divpostAdd = document.getElementById("postAdd");
            
            divpost.innerHTML = '';
            
            
            for (let i = 0; i < post.length; i++) {
                console.log(post[i].id);            
                divpost.innerHTML += `<div id="post${post[i].id}" class="posts"> <div class="contpost">
                <button id="btnDel${post[i].id}" onClick='btndelete(${post[i].id})'>-</button> titulo: ${post[i].title}<br><br> 
                texto: ${post[i].body}</div> <div id="postcom${post[i].id}" class="comment"></div> 
                 <br><button id="btnVer${post[i].id}" onClick='showCom(${post[i].id})'>Ver Comentarios</button> 
                <button id="btnOcul${post[i].id}" class="escondido" onClick='hide(${post[i].id})'>Ocultar Comentarios</button>
                 <br><br> </div> `
                // console.log(`post id ${post[i].id-10}` );
                
            }
            
            
            divpostAdd.innerHTML +=  `
                <div id="formtitle">
                    <label for="titulo">Titulo:</label>
                    <input id="titulo" type="text">
                </div>
                <div id="formbody">
                    <label for="texto">Texto:</label>
                    <input id="texto" type="text">
                </div>
                <button id="btnpost${post.length+1}" onClick='addpost(${post.length+1})'>Agregar post</button>
                `;
        }) 
})
function showCom(idPost){
    console.log(idPost);
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments`)
    .then(response => response.json())
    .then(comments =>{
        let divcomm= document.getElementById(`postcom${idPost}`);
        divcomm.innerHTML = "";
        console.log(comments.length);
        console.log("Comments" + comments);
        
        for (let i = 0; i < comments.length; i++) {
            // console.log(comments[i].title);            
            divcomm.innerHTML += `<div class="comentario">titulo: ${comments[i].name} <br> texto: ${comments[i].body}</div> <br><br>`;
            
            
        }
        
        let btnOcul=document.getElementById(`btnOcul${idPost}`);
        btnOcul.classList.toggle("escondido");
        let btnVer = document.getElementById(`btnVer${idPost}`);
        btnVer.classList.toggle("escondido");
    })
    
}
function hide(idPost) {
    // let comentario=document.getElementsByClassName("comentario");
    // for (let i = 0; i < comentario.length; i++) {
    //     comentario[i].classList.toggle("escondido");
    // }

    let divcomm= document.getElementById(`postcom${idPost}`);
    divcomm.innerHTML = "";

    let btnOcul=document.getElementById(`btnOcul${idPost}`);
    btnOcul.classList.toggle("escondido");
    let btnVer = document.getElementById(`btnVer${idPost}`);
    btnVer.classList.toggle("escondido");
    
}

function addpost(idPost) {
    let titulo = document.getElementById(`titulo`).value;
    console.log(titulo);
    let texto = document.getElementById(`texto`).value;
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: titulo,
          body: texto,
          userId: menu.value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
            console.log(json) 
            console.log("Se agregro el post");
            console.log(json.id);
            let divpost = document.getElementById("post");
            

            divpost.innerHTML += `<button id="btnDel${json.id}" onClick='btndelete(${json.id})'>-</button> titulo: ${json.title} <br><br> 
                 texto: ${json.body} <div id="postcom${json.id}" class="comment"></div> `;
                divpost.innerHTML += ` <br><button id="btnVer${json.id}" onClick='showCom(${json.id})'>Ver Comentarios</button> `
                divpost.innerHTML += `<button id="btnOcul${json.id}" class="escondido" onClick='hide(${json.id})'>Ocultar Comentarios</button> <br><br>`
            
        });
}

function btndelete(idPost) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`, {
        method: 'DELETE',
    });
    let divcomm= document.getElementById(`post${idPost}`);
    divcomm.innerHTML = "";
    
    
}


