var AccountController = {
    varifyUser: (actionBtn, url) => {
        const  userName = $('#uname').val();
        const password = $('#psw').val();
        const modelAccount = {
            userName: userName,
            password: password
        };
        AccountService.varifyUser(modelAccount, function (response) {
            //var dd = response;
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