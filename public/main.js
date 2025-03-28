$(document).ready(function() {
    $('.todo-checkbox').on('change', function() {
        var isChecked = $(this).prop('checked') ? 1 : 0;
        var todoId = $(this).data('id');
        
        var span = $(this).siblings('span');
        if (isChecked == 1) {
            span.addClass('completed');
        } else {
            span.removeClass('completed');
        }

        $.ajax({
            url: '/update-todo?id=' + todoId + '&completed=' + isChecked,
            type: 'GET',
            success: function(response) {
                console.log('Статус обновлен');
            }
        });
    });
});
