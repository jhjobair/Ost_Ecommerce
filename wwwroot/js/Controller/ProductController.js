
var lstCartProduct = [];

var ProductController = {
    LstProduct: () => {
        ProductService.LstProducts(function (response) {
            var productContent = "";
            $.each(response.products, function (index, value) {
                productContent= productContent+`
                   <div class="col-sm-3" style="margin-top:10px">
                        <div class="thumb-wrapper">
                            <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
                            <div class="img-box">
                                 <img id="pdPicture_${index}" src="${value.thumbnail}" class="img-fluid" alt="">
                            </div>
                            <div class="thumb-content text-center">
                                <h4 id="pdName_${index}">${value.title}</h4>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                        <p class="item-price" ><strike>${value.price}</strike> <b id="pdPrice_${index}">${value.price}</b></p>
                                        <a href="#" class="btn btn-secondary" id='btnAddToCart_${index}' onclick='ProductController.AddToCart(this)'>Add to Cart</a>
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
            if (parseInt(tergetIndex) !== index) {
                lstCartProduct_update.push(value);
            }
        });

        lstCartProduct = lstCartProduct_update;
        localStorage.setItem("lstCartProduct", JSON.stringify(lstCartProduct));
        $(tergetProductId).remove(); // remove from DOM
        ProductController.ArrangeProductForCart();

        if (lstCartProduct.length === 0) {
            $('#lblCartCount').html("0");
            $("#dvViewCartWrapper").html("<p>Your cart is empty</p>");
        }

        alert("Product Deleted Successfully");
    },

    ViewCart: () => {
        //if (lstCartProduct.length > 0) {
        //    $.each(lstCartProduct, function (index, value) {
        //        $("#dvViewCartWrapper").append(`
        //           <div style="clear:both;display:block;border:1px solid #ffff; height:50px;width:100%">
        //            <div class="row" style="padding:5px">
        //                <div class="col col-3">
        //                     <img src="${value.Image}" />
        //                </div>
        //                <div class="col col-3">
        //                    <span>${value.Name}</span>
        //                </div>
        //                <div class="col col-3">
        //                    <span>${value.price}</span>
        //                </div>
        //                <div class="col col-3">
        //                    X
        //                </div>
        //            </div>
        //          </div>
        //        `)
        //    })
            //}

    
               //this is with raw css no animation
        //if ($("#dvViewCartWrapper").css("right") == "0" || $("#dvViewCartWrapper").css("right") == "0px") {
        //    $("#dvViewCartWrapper").css("right", parseInt($("#dvViewCartWrapper").css("right").replace("px", "")) - 300);
        //}
        //else {
        //    $("#dvViewCartWrapper").css("right", parseInt($("#dvViewCartWrapper").css("right").replace("px", "")) + 300);
        //}
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
            <div class="cart-item" id='dvCartWrapper_${index}';style="clear:both; display:block; border:1px solid #fff; height:100px; width:100%;">
                <div class="row" style="padding:5px">
                    <div class="col-3">
                        <img src="${value.Image}" alt="${value.Name}" style="height:70px; width:70px;" />
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span>${value.Name}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span>${value.Price}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center ">
                        <span id='dltCartProduct_${index}' style='cursor:pointer; color:red;' onclick="ProductController.DeleteCartProduct('#dvCartWrapper_${index}', '${index}')">X</span>
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
                    $.each(lstCartProduct, function (index, value) {
                        $("#dvCheckoutWrapper").append(`
            <div class="cart-item" id='dvCartWrapper_${index}';style="clear:both; display:block; border:1px solid #fff; height:100px; width:100%;">
                <div class="row" style="padding:5px">
                    <div class="col-3">
                        <img src="${value.Image}" alt="${value.Name}" style="height:70px; width:70px;" />
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span>${value.Name}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span>${value.Price}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center ">
                        <span id='dltCartProduct_${index}' style='cursor:pointer; color:red;' onclick="ProductController.DeleteCartProduct('#dvCartWrapper_${index}', '${index}')">X</span>
                    </div>
                </div>
            </div>
        `);
                    });
                } catch (e) {
                    $('#lblCartCount').html("0");
                    lstCartProduct = [];
                }
            } else {
                $('#lblCartCount').html("0");
                lstCartProduct = [];
            }
        };
    }
}
