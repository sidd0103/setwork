$(document).ready(function(){
    //when the signin button is clicked
    $('#signin-btn').click(function(){
        handlesignin();
    })
    //when a signup button is pressed
    $('.signup-btn').click(function(){
        document.location.href = "register.html";
    });
    //example animation
    var animStates = ['second',''];
    var animText = ['Hire Mode','Work Mode'];
    var counter = 0;
    function animationFunction(){
        $('.example').addClass(animStates[counter % animStates.length]);
        $('.example').removeClass(animStates[(counter - 1) % animStates.length]);
        $('.switchbtn').text(animText[counter % animStates.length]);
        counter ++;
    }
    var flipAnimation = setInterval(animationFunction,3000);
    $('.switchbtn').mousedown(function(){
        counter ++;
        $('.example').addClass(animStates[counter % animStates.length]);
        $('.example').removeClass(animStates[(counter - 1) % animStates.length]);
        $('.switchbtn').text(animText[counter % animStates.length]);
        clearInterval(flipAnimation);
        flipAnimation = setInterval(animationFunction,3000);
    });
});

//functions
function handlesignin() {
    var payload = {};
    var success = true;
    $('input').each(function(){
        var type = $(this).attr('id');
        var content = $(this).val();
        if (content.length == 0) {
            Materialize.toast("You haven't filled in all fields!",2000);
            success == false;
            return false;
        }
        payload[type] = content;
    });
    if (success) {
        login(true, payload.email, payload.pass);
    }
}