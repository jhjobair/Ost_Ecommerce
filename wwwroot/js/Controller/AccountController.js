var AccountController = {
    varifyUser: (actionBtn, url) => {
        debugger
        userName = $('#uname').val();
        password = $('#psw').val();
        AccountService.varifyUser(userName, password, function (response) {
            debugger

            var dd = response;
            if (response == "Successfully Authorised") {
                localStorage.setItem("userName", userName);
                window.location.href = url;
            }
            else {
                alert("Unauthorise Access")
                console.log("Unauthorise Access");
            }
        });
    }
}