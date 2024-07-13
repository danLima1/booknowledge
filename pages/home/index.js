$(document).ready(function() {
    $('#search-input').on('input', function() {
        const searchValue = $(this).val().toLowerCase();
        $('.card-recentes').each(function() {
            let match = false;
            $(this).find('.title-text').each(function() {
                if ($(this).text().toLowerCase().includes(searchValue)) {
                    match = true;
                }
            });
            if (match) {
                $(this).closest('tr').show(); // Mostrar a linha da tabela se algum título corresponder à pesquisa
            } else {
                $(this).closest('tr').hide(); // Ocultar a linha da tabela se nenhum título corresponder à pesquisa
            }
        });
    });
});
