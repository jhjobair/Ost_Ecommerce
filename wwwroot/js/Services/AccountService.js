var AccountService = {
    varifyUser: (userName,password) => {
        $.get("https://localhost:7284/accountapi/varifyuser?username=" + userName +"&password="+password, function (data, status) {
            console.log(data);
            alert(status)
        })
    }
}