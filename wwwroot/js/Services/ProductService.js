var ProductService = {
    LstProducts: (callback) => {
        $.get("/json_api/products.json", function (data, status) {
            callback(data);
        });

    }
}