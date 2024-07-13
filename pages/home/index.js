$(document).ready(function() {
    $('#search-input').on('input', function() {
        const searchValue = $(this).val().toLowerCase();
        let matchFound = false;
        
        if (searchValue === '') {
            $('.card-recentes').show(); // Mostrar todos os cartões se o campo de busca estiver vazio
            $('.no-results').hide(); // Esconder a mensagem de "nenhum resultado"
        } else {
            $('.card-recentes').each(function() {
                let match = false;
                $(this).find('.title-text').each(function() {
                    if ($(this).text().toLowerCase().includes(searchValue)) {
                        match = true;
                    }
                });
                if (match) {
                    $(this).show(); // Mostrar a linha da tabela se algum título corresponder à pesquisa
                    matchFound = true;
                } else {
                    $(this).hide(); // Ocultar a linha da tabela se nenhum título corresponder à pesquisa
                }
            });

            if (matchFound) {
                $('.no-results').hide(); // Esconder a mensagem de "nenhum resultado"
            } else {
                $('.no-results').show(); // Mostrar a mensagem de "nenhum resultado"
            }
        }
    });
});
