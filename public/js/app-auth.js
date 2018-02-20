//authentication observer
var user;
var loggedIn;
var loginLockedURIs = ['profile'];
firebase.auth().onAuthStateChanged(function(usertemp) {
    if (usertemp) {
        // User is signed in.
        user = usertemp;
        loggedIn = true;
        handleLoginLockedPages(loggedIn);
    } else {
        // User is signed out.
        // if the user is in a login locked section of the website, send them to the login screen
        user = null;
        loggedIn = false;
        handleLoginLockedPages(loggedIn);
    }
});
//this function is very important: It allows us to render pages only if the user is logged in.
function handleLoginLockedPages(loggedInBool) {
  if (window.location.href.includes('profile.html')) {
    if (loggedInBool == true) {
      renderPage();
    }
    else {
      window.location.href = 'index.html'
    }
  }
}
function createAccount(email, pass, name) {
    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(){
        addDBAccount(email, pass, name);
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
            userStats: {
              name : name,
              uidFirebase : user.uid
            },
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
