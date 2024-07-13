$(document).ready(function() {
    $('#search-button').on('click', function() {
        fetchBooks();
    });

    // Função para verificar se o campo de pesquisa está vazio
    function checkEmptySearch() {
        var query = $('#search-input').val();
        if (query === '') {
            fetchRecentBooks(); // Se estiver vazio, busca os livros recentes
        }
    }

    // Chamando a função checkEmptySearch() sempre que o campo de pesquisa for modificado
    $('#search-input').on('input', checkEmptySearch);

    function fetchBooks() {
        var query = $('#search-input').val();
        var url = 'http://localhost:5000/search?query=' + query; 
        console.log('Fetching books with query:', query);  

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                console.log('Data received:', data); 
                var booksContainer = $('#books-container');
                booksContainer.empty();

                if (data.length === 0) {
                    $('.no-results').show();
                } else {
                    $('.no-results').hide();
                    data.forEach(function(book) {
                        var row = 
                            '<div class="photo">' +
                                '<a href="' + book.url + '" class="title">' +
                                    '<img src="' + book.image + '" alt="' + book.title + '">' +
                                '</a>' +
                                '<span class="title-text">' + book.title + '</span>' +
                            '</div>';
                        booksContainer.append(row);
                    });
                }
            },
            error: function(error) {
                console.error('Error fetching books:', error);
            }
        });
    }

    // Função para buscar os livros recentes
    function fetchRecentBooks() {
        var url = 'http://localhost:5000/search'; // Ajuste a URL do backend para buscar livros recentes
        console.log('Fetching recent books');

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                console.log('Recent books data received:', data);
                var booksContainer = $('#books-container');
                booksContainer.empty();

                if (data.length === 0) {
                    $('.no-results').show();
                } else {
                    $('.no-results').hide();
                    data.forEach(function(book) {
                        var row = 
                            '<div class="photo">' +
                                '<a href="' + book.url + '" class="title">' +
                                    '<img src="' + book.image + '" alt="' + book.title + '">' +
                                '</a>' +
                                '<span class="title-text">' + book.title + '</span>' +
                            '</div>';
                        booksContainer.append(row);
                    });
                }
            },
            error: function(error) {
                console.error('Error fetching recent books:', error);
            }
        });
    }

    // Fetch initial books on page load
    fetchRecentBooks(); // Carrega os livros recentes ao carregar a página
});