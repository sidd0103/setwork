$(document).ready(function(){
    //when the submit btn is pressed
    $('.submit-btn').click(function(){
        var id = $(this).attr('id');
            var succesful = true;
            var payload = {};
            $('.'+id +' input').each(function(){
                if ($(this).val() == 0) {
                    Materialize.toast("You haven't filled out all fields!",1000);
                    succesful = false;
                    return false;
                }
                if ($(this).attr('type') == 'email' && $(this).hasClass('invalid')) {
                    succesful = false;
                    Materialize.toast("You have entered an invalid email.",1000);
                    return false;
                }
                if ($(this).attr('type') == 'password' && $(this).hasClass('invalid')) {
                    succesful = false
                    Materialize.toast("Your passwords don't match!",1000);
                    return false;
                }
                payload[$(this).attr('id')] = $(this).val();
            })
            if (succesful) {
                if (id == 'login') {
                    firebase.auth().signInWithEmailAndPassword(payload['email-login'], payload['pass-login']).catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        Materialize.toast(errorMessage,1000);
                        succesful = false;
                    }).then(function(){
                        if (succesful) {
                            document.location.href = 'main.html';
                        }
                    });
                }
                if (id=='register') { //if registering
                    console.log(payload);
                    firebase.auth().createUserWithEmailAndPassword(payload['email'], payload['pass']).catch(function(error) { //create an account
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        Materialize.toast(errorMessage,1000);
                        succesful = false;
                        // ...
                    }).then(function(){ //afterwards, if the creation was succesful,
                        if (succesful) {
                            firebase.auth().signInWithEmailAndPassword(payload['email'], payload['pass']).catch(function(error) { //login to the account
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                Materialize.toast(errorMessage,1000);
                                succesful = false;
                            });
                            firebase.auth().onAuthStateChanged(function(user) { //once logged in, add the user to the user database.
                                if (user) {
                                    firebase.database().ref('users/' + user.uid).set({
                                        email: payload['email'],
                                        name: payload['first_name'] + ' ' + payload['last_name']
                                    }).catch(function(error) {
                                        Materialize.toast(errorMessage,1000);
                                        succesful = false;
                                    }).then(function(){
                                        if (succesful) {
                                            document.location.href = 'main.html';
                                        }
                                    });
                                }
                            });

                        }
                    });
                }
            }
    });

    //verify password ui
    $('.register #pass').keyup(function(){
        if ($('.register #vpass').val() != $(this).val()) {
            $('.register #vpass').addClass('invalid').removeClass('valid');
            $('.register #pass').addClass('invalid').removeClass('valid');
        }
        else {
            if ($('.register #vpass').val().length == 0) {
                $('.register #vpass').removeClass('invalid');
                $('.register #pass').removeClass('invalid');
            }
            else {
                $('.register #vpass').removeClass('invalid').addClass('valid');
                $('.register #pass').removeClass('invalid').addClass('valid');
            }
        }
    });
    $('.register #vpass').keyup(function(){
        if ($('.register #pass').val() != $(this).val()) {
            $('.register #vpass').addClass('invalid').removeClass('valid');
            $('.register #pass').addClass('invalid').removeClass('valid');
        }
        else {
            if ($('.register #vpass').val().length == 0) {
                $('.register #vpass').removeClass('invalid');
                $('.register #pass').removeClass('invalid');
            }
            else {
                $('.register #vpass').removeClass('invalid').addClass('valid');
                $('.register #pass').removeClass('invalid').addClass('valid');
            }
        }
    });
    //example animation
    var animStates = ['second',''];
    var animText = ['Hire Mode','Work Mode'];
    var counter = 0;
    function animationFunction(){
        $('.example').addClass(animStates[counter % animStates.length]).removeClass(animStates[(counter - 1) % animStates.length]);;
        $('.switchbtn').text(animText[counter % animStates.length]);
        counter ++;
    }
    var flipAnimation = setInterval(animationFunction,3000);
    $('.switchbtn').mousedown(function(){
        counter ++;
        $('.example').addClass(animStates[counter % animStates.length]).removeClass(animStates[(counter - 1) % animStates.length]);
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