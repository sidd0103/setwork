$(document).ready(function(){
    init();
    $('ul.tabs').tabs();
    $('.pic-area .profile').click(function(){
        window.location.href = 'profile.html#me';
    })
})
