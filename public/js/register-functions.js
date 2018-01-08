function getType() {
    var type = window.location.hash.substr(1);
    if (type.length == 0) {
        type = "employee";
    }
    return type.toUpperCase();
}
function submitForm() {
    var payload = {};
    var success;
    $('input').each(function(){
        var val = $(this).val();
        var type = $(this).attr('id');
        //if one of the input fields is empty, stop any processing from occuring
        if (val.length == 0) {
            Materialize.toast("You left an input field empty!",1000);
            success = false;
            return false;
        }
        //if the type is email, make sure its valid
        if (type == 'email') {
            if ($(this).attr('class').includes('invalid')) {
                Materialize.toast("Your email field was invalid!",1000);
                success = false;
                return false;
            }
        }
        //if the type is a password, make sure its valid
        if (type == 'pass') {
            if ($(this).attr('class').includes('invalid')) {
                if (val.length > 5) {
                    Materialize.toast("Your passwords didn't match!",1000);
                    success = false;
                    return false;
                }
                else {
                    Materialize.toast("Your password wasn't greater than 5 characters!",1000);
                    success = false;
                    return false;
                }
            }
        }
        //add the value to the payload
        payload[type] = val;
    })
    if (success == false) {
        return false;
    }
    //check username availability
    verifyUsername();
    //if all goes well, create an account
    var name = payload.fname + ' ' + payload.lname;
    createAccount(payload.email, payload.pass, name);
}