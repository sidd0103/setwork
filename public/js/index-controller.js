$(document).ready(function(){
    //when the signin button is clicked
    $('#signin-btn').click(function(){
        console.log("tried to sign in");
    })
    //when a signup button is pressed
    $('.signup-btn').click(function(){
        var type = $(this).attr('class').replace('signup-btn waves-effect ','');
        document.location.href = "register.html#" + type;
    })
});