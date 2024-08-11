$(document).ready(function() {
    const apiUrl = 'https://api-booknowledge.onrender.com';
    let currentPage = 1;
    let totalPages = 1;

    // Função para buscar livros baseados na página atual
    function fetchBooks(page = 1) {
        var query = $('#search-input').val();
        var url = apiUrl + '/search?query=' + encodeURIComponent(query) + '&page=' + page;
        console.log('Fetching books with query:', query, 'Page:', page);

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                console.log('Data received:', data);
                var booksContainer = $('#books-container');
                booksContainer.empty();

                if (data.books.length === 0) {
                    $('.no-results').show();
                } else {
                    $('.no-results').hide();
                    data.books.forEach(function(book) {
                        var row = 
                            '<div class="photo">' +
                                '<a href="' + book.url + '" class="title">' +
                                    '<img src="' + book.image + '" alt="' + book.title + '">' +
                                '</a>' +
                            '</div>';
                        booksContainer.append(row);
                    });
                }

                // Atualizar informações de paginação
                totalPages = data.total_pages;
                currentPage = data.current_page;
                $('#page-info').text('Página ' + currentPage + ' de ' + totalPages);

                // Habilitar/desabilitar botões de navegação
                $('#prev-page').prop('disabled', currentPage === 1);
                $('#next-page').prop('disabled', currentPage === totalPages);
            },
            error: function(error) {
                console.error('Error fetching books:', error);
            }
        });
    }

    // Função para buscar os livros recentes ao carregar a página
    function fetchRecentBooks() {
        fetchBooks(currentPage);
    }

    // Submissão do formulário de pesquisa
    $('#search-input').on('input', function() {
        currentPage = 1; // Redefinir para a primeira página na nova pesquisa
        fetchBooks(currentPage);
    });

    // Controles de paginação
    $('#prev-page').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchBooks(currentPage);
        }
    });

    $('#next-page').on('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            fetchBooks(currentPage);
        }
    });

    // Abrir modal para adicionar livro
    $('#add-book-button').on('click', function() {
        $('#add-book-modal').show();
    });

    // Fechar modal ao clicar no botão de fechar
    $('.close-button').on('click', function() {
        $('#add-book-modal').hide();
    });

    // Submissão do formulário de adicionar livro
    $('#add-book-form').on('submit', function(e) {
        e.preventDefault();

        // Mostrar indicador de carregamento
        $('#loading-indicator').show();

        var bookData = {
            title: $('#book-title').val(),
            url: $('#book-url').val(),
            image: $('#book-image').val()
        };

        $.ajax({
            url: apiUrl + '/add-book',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(bookData),
            success: function(response) {
                console.log('Book added:', response);
                $('#loading-indicator').hide();
                $('#add-book-modal').hide();
                fetchBooks(currentPage); // Recarregar a lista de livros
            },
            error: function(error) {
                console.error('Error adding book:', error);
                $('#loading-indicator').hide();
                alert('Erro ao adicionar livro. Verifique se todos os campos estão preenchidos corretamente.');
            }
        });
    });

    // Inicializar com os livros recentes
    fetchRecentBooks();
});
