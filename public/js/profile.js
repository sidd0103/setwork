//controller
$(document).ready(function(){
    init();
    $('ul.tabs').tabs();
    $('.pic-area .profile').click(function(){
        window.location.href = 'profile.html#me';
    })
})

//functions
function init() {
    $('.nav-open').sideNav({
        menuWidth: 250, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function (el) {}, // A function to be called when sideNav is opened
        onClose: function (el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
    });
    console.log('init');
}