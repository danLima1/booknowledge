$(document).ready(function() {
    $('#search-button').on('click', function() {
        fetchBooks();
    });

    function fetchBooks() {
        var query = $('#search-input').val();
        var url = `http://localhost:5000/search?query=${query}`;

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                var booksContainer = $('#books-container');
                booksContainer.empty();

                if (data.length === 0) {
                    $('.no-results').show();
                } else {
                    $('.no-results').hide();
                    data.forEach(function(book) {
                        var row = `
                            <tr class="card-recentes">
                                <td>
                                    <div class="photo">
                                        <a href="${book.url}" class="title">
                                            <img src="${book.image}" alt="${book.title}">
                                        </a>
                                        <span class="title-text">${book.title}</span>
                                    </div>
                                </td>
                            </tr>
                        `;
                        booksContainer.append(row);
                    });
                }
            },
            error: function(error) {
                console.error('Error fetching books:', error);
            }
        });
    }

    // Fetch initial books on page load
    fetchBooks();
});
