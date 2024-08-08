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
        var url = 'https://api-booknowledge.onrender.com/search?query=' + query; 
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
document.getElementById('add-book-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const image = document.getElementById('image').value;

    const response = await fetch('http://localhost:5000/add-book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, url, image }),
    });

    const result = await response.json();
    if (response.ok) {
        alert('Livro adicionado com sucesso!');
        // Limpar o formulário
        document.getElementById('add-book-form').reset();
    } else {
        alert(`Erro: ${result.error}`);
    }
});
    // Função para buscar os livros recentes
    function fetchRecentBooks() {
        var url = 'https://api-booknowledge.onrender.com/search'; // Ajuste a URL do backend para buscar livros recentes
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
                                '</a>' 
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
