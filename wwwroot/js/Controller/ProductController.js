
var lstCartProduct = [];

var ProductController = {
    debugger;
    LoadCategories: (url) => {
        var LiCategory = "";
        ProductService.LoadCategories(function (response) {
            $.each(response, function (index, value) {
                LiCategory += `<a href="${url}/${value.name}">${value.name}</a> </br>`;
            });
            $('#ulMenu').html(LiCategory);
        });
    },
    LstProductCategories: (CategoryName) => {
        debugger;
        console.log(CategoryName);
        ProductService.LoadProductByCategories(CategoryName,function (response) {
            var productContent = "";
            $.each(response.products, function (index, value) {
                
                productContent = productContent + `
                   <div class="col-sm-3" style="margin-top:10px">
                        <div class="thumb-wrapper">
                            <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
                            <div class="img-box">
                                 <img id="pdPicture_${value.id}"  src="${value.thumbnail}" style="cursor:pointer" onclick="window.location.href='/product/singleproduct/${value.id}'" class="img-fluid" alt="">
                            </div>
                            <div class="thumb-content text-center">
                                <h4 id="pdName_${value.id}" style="cursor:pointer"onclick="window.location.href='/product/singleproduct/${value.id}'">${value.title}</h4>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                        <p class="item-price" ><strike>${value.price}</strike> <b id="pdPrice_${value.id}">${value.price}</b></p>
                                        <a href="#" class="btn btn-secondary" id='btnAddToCart_${value.id}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>
                            </div>
                        </div>
                    </div>
                `;
            })
            $('#CategoryList').html(productContent);
        })

    },



    LstProduct: () => {
        ProductService.LstProducts(function (response) {
            var productContent = "";
            $.each(response.products, function (index, value) {
                productContent= productContent+`
                   <div class="col-sm-3" style="margin-top:10px">
                        <div class="thumb-wrapper">
                            <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
                            <div class="img-box">
                                 <img id="pdPicture_${value.id}"  src="${value.thumbnail}" style="cursor:pointer" onclick="window.location.href='/product/singleproduct/${value.id}'" class="img-fluid" alt="">
                            </div>
                            <div class="thumb-content text-center">
                                <h4 id="pdName_${value.id}" style="cursor:pointer"onclick="window.location.href='/product/singleproduct/${value.id}'">${value.title}</h4>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                        <p class="item-price" ><strike>${value.price}</strike> <b id="pdPrice_${value.id}">${value.price}</b></p>
                                        <a href="#" class="btn btn-secondary" id='btnAddToCart_${value.id}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>
                            </div>
                        </div>
                    </div>
                `;
            })
            $('#productList').html(productContent);
        })
        
    },
    AddToCart: (contrl) => {
        if (localStorage.getItem("lstCartProduct") != undefined && localStorage.getItem("lstCartProduct") != null) {
            lstCartProduct = JSON.parse(localStorage.getItem("lstCartProduct"));
        }

        var tergetIndex = $(contrl).attr("id").split("_")[1];
        var targetImage = $('#pdPicture_' + tergetIndex).attr('src');
        var targetName = $('#pdName_' + tergetIndex).html();
        var targetPrice = $('#pdPrice_' + tergetIndex).html();


        var targetProduct =
        {
            id: tergetIndex,
            Name: targetName,
            Image: targetImage,
            Price: targetPrice
        }
 
        lstCartProduct.push(targetProduct);
        localStorage.setItem("lstCartProduct", JSON.stringify(lstCartProduct));
        ProductController.ArrangeProductForCart();
        alert("Product Added to Cart")
    },
    DeleteCartProduct: (tergetProductId, tergetIndex) => {
        let lstCartProduct_update = [];

        $.each(lstCartProduct, function (index, value) {
            if (tergetIndex !== value.id) {
                lstCartProduct_update.push(value);
            }
        });

        lstCartProduct = lstCartProduct_update;
        localStorage.setItem("lstCartProduct", JSON.stringify(lstCartProduct));
        $(tergetProductId).remove();
        ProductController.ArrangeProductForCart();

        if (lstCartProduct.length === 0) {
            $('#lblCartCount').html("0");
            $("#dvViewCartWrapper").html("<p>Your cart is empty</p>");
        }

        alert("Product Deleted Successfully");
    },

    ViewCart: () => {
        if ($("#dvViewCart").css("right") == "0" || $("#dvViewCart").css("right") == "0px") {
            $("#dvViewCart").animate({
                right: "-300"
            }, "fast");
        }
        else {
            $("#dvViewCart").animate({
                right: "0"
            }, "fast");        }

        
    },
    ArrangeProductForCart: () => {
        if (lstCartProduct.length > 0) {
            $('#lblCartCount').html(lstCartProduct.length);
            $("#dvViewCartWrapper").html('');
            $.each(lstCartProduct, function (index, value) {
                $("#dvViewCartWrapper").append(`
            <div class="cart-item" id='dvCartWrapper_${value.id}';style="clear:both; display:block; border:1px solid #fff; height:100px; width:100%;">
                <div class="row" style="padding:5px">
                    <div class="col-3">
                        <img onclick="window.location.href='/product/singleproduct/${value.id}'" src="${value.Image}" alt="${value.Name}" style="height:70px; width:70px;" />
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span onclick="window.location.href='/product/singleproduct/${value.id}'">${value.Name}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span>${value.Price}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center ">
                        <span id='dltCartProduct_${value.id}' style='cursor:pointer; color:red;' onclick="ProductController.DeleteCartProduct('#dvCartWrapper_${value.id}', '${value.id}')">X</span>
                    </div>
                </div>
            </div>
        `);
        });
        }

        if ($('body').find('#dvCheckoutWrapper').length > 0) {
            $("#dvCheckoutWrapper").html("");
            $.each(lstCartProduct, function (index, value) {
                $("#dvCheckoutWrapper").append(`
            <div class="cart-item" id='dvCartWrapper_${value.id}';style="clear:both; display:block; border:1px solid #fff; height:100px; width:100%;">
                <div class="row" style="padding:5px">
                    <div class="col-3">
                        <img onclick="window.location.href='/product/singleproduct/${value.id}'" src="${value.Image}" alt="${value.Name}" style="height:70px; width:70px;" />
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span onclick="window.location.href='/product/singleproduct/${value.id}'">${value.Name}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span>${value.Price}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center ">
                        <span id='dltCartProduct_${value.id}' style='cursor:pointer; color:red;' onclick="ProductController.DeleteCartProduct('#dvCartWrapper_${value.id}', '${value.id}')">X</span>
                    </div>
                </div>
            </div>
        `);
            });
        }
    },
    PrepareCartForCheckoutUI: (url) => {
        if (lstCartProduct.length > 0) {
            window.location.href = url;
        }
        else {
            alert("Cart Empty");
        }
    },
    LoadCartProductForCheckout: () => {
        if (localStorage.getItem("lstCartProduct") != null && localStorage.getItem("lstCartProduct") != undefined) {
            var cartData = localStorage.getItem("lstCartProduct");
            if (cartData) {
                try {
                    lstCartProduct = JSON.parse(cartData);
                    ProductController.ArrangeProductForCart();
                }
                catch (e) {
                    $('#lblCartCount').html("0");
                    lstCartProduct = [];
                }
            } else {
                $('#lblCartCount').html("0");
                lstCartProduct = [];
            }
        };
    },
    SingleProduct: (productID) => {
        ProductService.SingleProduct(productID, function (response) {
            var imageHTML = ``;
            if (response.images>1) {
                $.each(response.images, function (index, value) {
                    imageHTML = imageHTML + `
                <div class="col col-3" style="width:100px;height:100px">
                                <img src="${value}" onclick="javascript:$('#imgTergetBigView').attr('src','${value}')" style="width:100px;height:100px" />
                            </div>
                       `
                });
            }
           

            $('#dvSingleViewProduct').html(`
                <div class="row">
                    <div class="col col-4">
                        <div class="row">
                            <div class="col col-12"style="width:500px">
                                <img id="imgTergetBigView" src="${response.images}" style="width:100%" />
                            </div>
                        </div>
                        <div class="row">
                          ${imageHTML}
                            
                        </div>
                    </div>
                        <div class="col col-8" style="padding-top: 100px;">
                            <span>${response.title} </span> <br />
                            <span>${response.description}  </span> <br />
                            <span>Price: ${response.price}$ </span> <br />
                            <span>DiscountPercentage: ${response.discountPercentage}% </span> <br />
                            <span>Available: ${response.stock} pices </span> <br />
                            <span class="btn btn-primary"  >Add To Cart</span> <br />
                        </div>
                </div>
            `);
        })
    },
}
