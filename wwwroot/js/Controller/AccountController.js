var AccountController = {
    varifyUser: (actionBtn) => {
        userName = $('#uname').val();
        password = $('#psw').val();
        AccountService.varifyUser(userName,password);
    }
}