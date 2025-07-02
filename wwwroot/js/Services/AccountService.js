var AccountService = {
    varifyUser: (userName,password,callback) => {
        $.get("https://localhost:7284/accountapi/varifyuser?username=" + userName +"&password="+password, function (data, status) {
            alert("This is my service! what i do sir...");
            callback(data);
        })
    }
}