$('.link').click(function(){
    console.log("hi");
    var href = $(this).attr('data-to');
    console.log(href);
    document.location.href = href;
});