//authentication observer
var user;
var loggedIn;
firebase.auth().onAuthStateChanged(function(usertemp) {
    if (usertemp) {
        // User is signed in.
        user = usertemp;
        loggedIn = true;
        // ...
    } else {
        // User is signed out.
        // ...
        user = null;
        loggedIn = false;
    }
});

function createAccount(email, pass, name) {
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(){
        addDBAccount(email, pass, name, type);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        Materialize.toast(errorMessage,3000);
    });
}
function addDBAccount(email, pass, name) {
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    }).then(function(){
        var postData = {
            name: name,
        };
        //Create a user profile on the database and add the username. 
        var updates = {};
        updates['/users/' + user.uid] = postData;

        return firebase.database().ref().update(updates).then(function(){
            Materialize.toast("Created an account. Welcome!",2000);
        });
    });
}
function login(fromlanding, email, pass) {
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Materialize.toast(errorMessage,2000);
        // ...
    }).then(function(){
        if (fromlanding) {
            document.location.href = 'pinboard.html';
        }
    });
}