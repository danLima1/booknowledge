$(document).ready(function() {
    // Inicializa o aplicativo
    myApp();

    // Toggle do menu lateral em telas menores
    $('#menu-toggle').on('click', function() {
        if (window.innerWidth <= 768) { // Verifica se a largura da tela é menor ou igual a 768px
            $('#mobile-menu').toggleClass('active');
        }
    });

    // Fechar o menu quando um link é clicado
    $('#mobile-menu a').on('click', function() {
        $('#mobile-menu').removeClass('active');
    });

    // Fechar o menu ao clicar fora dele
    $(document).on('click', function(e) {
        if (window.innerWidth <= 768) { // Aplica apenas em telas menores ou iguais a 768px
            if (!$(e.target).closest('#menu-toggle, #mobile-menu').length) {
                $('#mobile-menu').removeClass('active');
            }
        }
    });
});

// Aplicativo principal.
function myApp() {
    // Aceite de cookies.
    if (cookie.get('acceptCookies') == 'on')
        $('#aboutCookies').hide()
    else $('#aboutCookies').show()

    // Carrega a página à partir de rotas diretas.
    if (sessionStorage.path == undefined) sessionStorage.path = 'home'
    path = sessionStorage.path
    delete sessionStorage.path
    loadpage(path)

    // Tratamento de eventos.
    $(document).on('click', 'a', routerLink)
    $(document).on('click', '.article', loadArticle)
    $('#policies').click(() => { loadpage('policies') })
    $('#accept').click(() => {
        cookie.set('acceptCookies', 'on', 365)
        $('#aboutCookies').hide()
    })
}

// Processa rotas.
function routerLink() {
    var href = $(this).attr('href').trim().toLowerCase()

    if (href == '#top') {
        window.scrollTo(0, 0)
        return false
    }

    if (
        href.substring(0, 7) == 'http://' ||
        href.substring(0, 8) == 'https://' ||
        href.substring(0, 4) == 'tel:' ||
        href.substring(0, 7) == 'mailto:'
    )
        return true

    loadpage(href)
    return false
}

// Carrega a página da rota na SPA.
function loadpage(page, updateURL = true) {
    const path = {
        html: `pages/${page}/index.html`,
        css: `pages/${page}/index.css`,
        js: `pages/${page}/index.js`
    }

    $.get(path.html)
        .done((data) => {
            if (data.trim().substring(0, 9) != '<article>')
                loadpage('e404', false)
            else {
                $('#pageCSS').attr('href', path.css)
                $('main').html(data)
                $.getScript(path.js)
            }
        })
        .catch(() => {
            loadpage('e404', false)
        })

    window.scrollTo(0, 0);
    if (updateURL) window.history.pushState({home}, '', page);
}

// Muda o título da página → <title></title>
function changeTitle(title = '') {
    let pageTitle = app.siteName + ' - '
    if (title == '') pageTitle += app.siteSlogan
    else pageTitle += title
    $('title').html(pageTitle)
}

// Calcula a idade com base na data.
function getAge(sysDate) {
    const today = new Date()
    const tYear = today.getFullYear()
    const tMonth = today.getMonth() + 1
    const tDay = today.getDate()

    const parts = sysDate.split('-')
    const pYear = parts[0]
    const pMonth = parts[1]
    const pDay = parts[2]

    var age = tYear - pYear

    if (pMonth > tMonth || pMonth == tMonth && pDay > tDay) age--

    return age
}

// Carrega o artigo completo.
function loadArticle() {
    sessionStorage.article = parseInt($(this).attr('data-id'))
    loadpage('view')
}

// Sanitiza um texto, removendo todas as tags HTML.
function stripHTML(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

// Exibe um banner popup.
function popUp(pData) {
    var pStyle = ''
    switch (pData.type) {
        case 'error': pStyle = 'background-color: #f00; color: #fff'; break
        case 'alert': pStyle = 'background-color: #ff0; color: #000'; break
        case 'success': pStyle = 'background-color: #0f0; color: #000'; break
        default: pStyle = 'background-color: #fff; color: #000'
    }

    $('body').prepend(`
        <div id="popup">
            <style>
                #popup { position: fixed; top: 0; left: 0; width: 100%; background-color: rgba(0, 0, 0, .5); z-index: 100; padding: 1rem; display: flex; align-items: center; justify-content: center; }
                .popup-body { margin: auto; padding: .5rem .5rem .5rem 1rem; display: flex; align-items: center; justify-content: center; border-radius: .3rem; }
                .popup-close { font-size: 1.5rem; margin-left: 1rem; }
            </style>  
            <div class="popup-body" style="${pStyle}">
                <div class="popup-text">${pData.text}</div>
                <div class="popup-close"><i class="fa-solid fa-xmark fa-fw"></i></div>
            </div>
        </div>
        `)

    var t = setTimeout(() => {
        $('#popup').remove()
        clearTimeout(t)
    }, parseInt(pData.time) || 3000)
    $('#popup').click(() => {
        $('#popup').remove()
        clearTimeout(t)
    })
}

// Tratamento de datas.
const myDate = {
    sysToBr: (systemDate, time = true) => {
        var parts = systemDate.split(' ')[0].split('-')
        var out = `${parts[2]}/${parts[1]}/${parts[0]}`
        if (time) out += ` às ${systemDate.split(' ')[1]}`
        return out
    },
    jsToBr: (jsDate, time = true) => {
        var theDate = new Date(jsDate)
        var out = theDate.toLocaleDateString('pt-BR')
        if (time) out += ` às ${theDate.toLocaleTimeString('pt-BR')}`
        return out
    },
    todayToSys: () => {
        const today = new Date()
        return today.toISOString().replace('T', ' ').split('.')[0]
    }
}

// Implementa a instrução String.truncate(length).
String.prototype.truncate = String.prototype.truncate ||
    function (n, useWordBoundary) {
        if (this.length <= n) { return this; }
        const subString = this.slice(0, n - 1);
        return (useWordBoundary
            ? subString.slice(0, subString.lastIndexOf(" "))
            : subString) + "&hellip;";
    };

// Tratamento de cookies.
const cookie = {
    set: (cname, cvalue, exdays) => {
        const d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        let expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    },
    get: (cname) => {
        let name = cname + '='
        let decodedCookie = decodeURIComponent(document.cookie)
        let ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') c = c.substring(1)
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
        }
        return ''
    }
}
