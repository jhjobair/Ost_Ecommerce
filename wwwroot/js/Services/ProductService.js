var ProductService = {
    LstProducts: (callback) => {
        $.get("https://localhost:7284/productAPI/Index", function (data, status) {
            callback(data);
        })
    }
}