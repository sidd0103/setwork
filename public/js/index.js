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