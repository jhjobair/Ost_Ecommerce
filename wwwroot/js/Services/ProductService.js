var ProductService = {
    LstProducts: (callback) => {
        $.get("/json_api/products.json", function (data, status) {
            callback(data);
        });

    },
     SingleProduct: ( productID,callback) => {
        $.get("https://dummyjson.com/products/"+productID, function (data, status) {
            callback(data);
        });

    }
}