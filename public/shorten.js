$('.btn').on('click' , function () {

    $.ajax({
        url : '/api/shorten',
        type : 'POST',
        datatype : 'JSON',
        data : {url : $('#data').val()},
        success : function (data) {
            var result = '<a class="result" href="' + data.shortUrl + '">' + data.shortUrl + '</a>';

            $('#Fresult').html(result);
            $('#Fresult').hide().fadeIn('slow');
        }
    })
}