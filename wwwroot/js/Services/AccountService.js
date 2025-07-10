//var AccountService = {
//    varifyUser: (userName,password,callback) => {
//        $.get("https://localhost:7284/accountapi/varifyuser?username=" + userName +"&password="+password, function (data, status) {
//            callback(data);
//        })
//    }
//}

//var AccountService = {
//    varifyUser: (modelAccount, callback) => {
//        $.get("https://localhost:7284/accountapi/varifyuser?username=" + userName + "&password=" + password)
//            .done(function (data, status) {
//                callback(data);
//            })
//            .fail(function (jqXHR, textStatus, errorThrown) {
//                console.error("Request failed: " + textStatus, errorThrown);
//                callback("Error"); // You can pass a special value back
//            });
//    }
//}

var AccountService = {
    varifyUser: (modelAccount, callback) => {
        $.post("https://localhost:7284/accountapi/varifyuser", modelAccount)
            .done(function (data) {
                callback(data);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Request failed: " + textStatus, errorThrown);
                callback("Error");
            });
    }
};


