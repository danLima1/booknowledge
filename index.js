$(document).ready(myApp)

function myApp() {

  // verifica se o session storage contem alguma rota
  if (sessionStorage.path == undefined) {
    //se não houver, aponta para index raiz
    sessionStorage.path = 'index.html'
  }
  path = sessionStorage.path
  delete sessionStorage.path
  // carrega a página solicitada pela rota
  loadpage(path)

  $(document).on('click', 'a', routerlink)
}

function routerlink() {
  var href = $(this).attr('href').trim().toLowerCase()


  if (
    href.substring(0, 7) == 'http://' ||
    href.substring(0, 8) == 'https://' ||
    href.substring(0, 1) == '#' 

)

    return true

  if (href == 'login'){

  }

loadpage(href)

return false

}




