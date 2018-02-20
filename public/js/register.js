$(document).ready(function(){
    //when this is clicked, go back home
    $('.bar-content').on('click',function(){
        document.location.href = 'index.html';
    });
    //when the type is clicked, change the type.
    $('.type').on('mousedown',function(){
        var index = types.indexOf($(this).text());
        type = types[(index + 1) % types.length];
        Materialize.toast('You changed the type of registration!',1000);
        $(this).text(type);
    })
    //while you are writing your passwords verify them with these functions
    $('.pass-entry').on('keyup',function(){
        var ids = ['pass','pass2'];
        var thisIdIndex = ids.indexOf($(this).attr('id'));
        var otherPassElement = '#' + ids[(thisIdIndex + 1) % ids.length];
        if ($(this).val() == $(otherPassElement).val()) {
            //if passwords match, check to see if length is greater than 5
            if ($(this).val().length < 5) {
                $(this).removeClass('valid').addClass('invalid');
                $(otherPassElement).removeClass('valid').addClass('invalid');
            }
            else {
                $(this).removeClass('invalid').addClass('valid');
                $(otherPassElement).removeClass('invalid').addClass('valid');
            }
        }
        else {
            $(this).removeClass('valid').addClass('invalid');
            $(otherPassElement).removeClass('valid').addClass('invalid');
        }
    })
    //when the submit form button is clicked,
    $('.submit-btn').on('mousedown',function(){
        submitForm();
    })

})


//functions


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
    //if all goes well, create an account
    var name = payload.fname + ' ' + payload.lname;
    createAccount(payload.email, payload.pass, name);
}
