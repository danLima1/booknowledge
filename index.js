$(document).ready(myApp)

function myApp(){


}


// verifica se o session storage contem alguma rota
if (sessionStorage.path == undefined) 
//se não houver, aponta para index raiz
sessionStorage.path = 'index.html'
path = sessionStorage.path
delete sessionStorage.path
// carrega a página solicitada pela rota
loadpage(path)

$(documente).on('click', 'a', routerlink)