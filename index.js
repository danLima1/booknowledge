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

function loadpage(page, updateURL = true){
  const path = {
    html: `pages/${page}/index.html`,
    css: `pages/${page}/index.css`,
    js: `pages/${page}/index.js`
  }

  $.get(path.html)

  .done((data) => {
    if(data.trim().substring(0, 9) != 'article')
 loadpage('404', false)
    else{
      $('#pageCSS').attr('href', path.css)

      $('main').html(data)

      $.getScript(path.js)
    }
  } )

.catch(()=>{
loadpage('e404', false)

})
  
if(updateURL) window.history.pushState({}, '', page)


}




