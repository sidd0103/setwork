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