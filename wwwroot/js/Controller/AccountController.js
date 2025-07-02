var AccountController = {
    varifyUser: (actionBtn) => {
        userName = $('#uname').val();
        password = $('#psw').val();
        AccountService.varifyUser(userName, password, function (response) {
            alert("Controller alert:"+response);
        });
    }
}