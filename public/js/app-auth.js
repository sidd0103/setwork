//authentication observer
var user;
firebase.auth().onAuthStateChanged(function(usertemp) {
    if (usertemp) {
        // User is signed in.
        user = usertemp;
        // ...
    } else {
        // User is signed out.
        // ...
        user = null;
    }
});

function createAccount(email, pass, username, name) {
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(){
        addDBAccount(email, pass, username, name);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        Materialize.toast(errorMessage,3000);
    });
}
function addDBAccount(email, pass, username, name) {
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    }).then(function(){
        var postData = {
            username: username,
            name: name
        };
        //Create a user profile on the database and add the username. 
        var updates = {};
        updates['/users/' + user.uid] = postData;
        updates['/usernames/' + username] = user.uid;

        return firebase.database().ref().update(updates).then(function(){
            Materialize.toast("Created an account. Welcome!",2000);
        });
    });
}