$(()=>{
    $('i.fa-link').click(function(){
        const copyText = $(this).siblings('a.link').text();
        console.log($(this).siblings('a.link').text());
        document.addEventListener('copy', function(e) {
            e.clipboardData.setData('text/plain', copyText);
            e.preventDefault();
         }, true);
        document.execCommand("copy");
        alert("link copied: "+ copyText)
    })
})