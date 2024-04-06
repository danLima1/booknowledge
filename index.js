function myHome() {
    changeTitle();
  
    var articleList = "";
  
    $.get(app.apiBaseURL + "articles").done((data) => {
      if (data.length > 0) {
        data.forEach((art) => {
          articleList += `
                      <div class="article art-item" data-id="${art.id}">
                          <img src="${art.thumbnail}" alt="${art.title}">
                          <div>
                              <h3>${art.title}</h3>
                              <p>${art.resume}</p>
                          </div>
                      </div>                    
                  `;
        });
        $(".post-main").html(articleList);
        getMostViewed(5);
        getLastComments(5);
      } else {
        $(".post-main").html("nenhum artigo publicado.");
      }
    });
  }
  