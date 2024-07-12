$(document).ready(function() {
    $('#search-input').on('input', function() {
        const searchValue = $(this).val().toLowerCase();
        if (searchValue === '') {
            $('.card-recentes').show(); // Show all cards if search input is empty
        } else {
            $('.card-recentes').each(function() {
                const titles = $(this).find('.title-text');
                let match = false;
                titles.each(function() {
                    if ($(this).text().toLowerCase().includes(searchValue)) {
                        match = true;
                        return false; // Break out of the loop
                    }
                });
                if (match) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });
});