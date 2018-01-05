$(document).ready(function(){
    var type = getType();
    var types = ['EMPLOYEE','EMPLOYER']
    $('.type').text(type);
    
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