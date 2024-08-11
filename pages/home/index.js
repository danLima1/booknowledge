$(document).ready(function() {
    const apiUrl = 'https://api-booknowledge.onrender.com';

    // Botão para abrir o modal
    $('#add-book-button').on('click', function() {
        $('#add-book-modal').show();
    });

    // Botão para fechar o modal
    $('.close-button').on('click', function() {
        $('#add-book-modal').hide();
    });

    // Fechar o modal se o usuário clicar fora dele
    $(window).on('click', function(event) {
        if ($(event.target).is('#add-book-modal')) {
            $('#add-book-modal').hide();
        }
    });

    // Submissão do formulário para adicionar livro
    $('#add-book-form').on('submit', function(event) {
        event.preventDefault();

        const newBook = {
            title: $('#book-title').val(),
            url: $('#book-url').val(),
            image: $('#book-image').val(),
        };

        $.ajax({
            url: apiUrl + '/add-book',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newBook),
            success: function(response) {
                alert('Livro adicionado com sucesso!');
                $('#add-book-modal').hide();
                fetchRecentBooks(); // Recarregar os livros para mostrar o novo livro adicionado
            },
            error: function(error) {
                console.error('Erro ao adicionar livro:', error);
                alert('Erro ao adicionar livro. Verifique os dados e tente novamente.');
            }
        });
    });

    // Verificar se o campo de pesquisa está vazio
    function checkEmptySearch() {
        var query = $('#search-input').val();
        if (query === '') {
            fetchRecentBooks(); // Se estiver vazio, busca os livros recentes
        }
    }

    // Chamando a função checkEmptySearch sempre que o campo de pesquisa for modificado
    $('#search-input').on('input', checkEmptySearch);

    // Função para buscar livros baseados na pesquisa
    function fetchBooks() {
        var query = $('#search-input').val();
        var url = apiUrl + '/search?query=' + encodeURIComponent(query);
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
        console.log('Fetching recent books');

        $.ajax({
            url: apiUrl + '/search',
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

    // Buscar livros recentes ao carregar a página
    fetchRecentBooks();
});
