$('.link').on('click',function(){
    var href = $(this).attr('data-to');
    document.location.href = href;
});