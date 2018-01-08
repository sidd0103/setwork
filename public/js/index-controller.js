$(document).ready(function(){
    //when the signin button is clicked
    $('#signin-btn').click(function(){
        handlesignin();
    })
    //when a signup button is pressed
    $('.signup-btn').click(function(){
        document.location.href = "register.html";
    });
});