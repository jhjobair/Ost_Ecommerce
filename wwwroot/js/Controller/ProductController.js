
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
        console.log("__________Existing Product_____________");
        console.log(lstCartProduct);
        var tergetIndex = $(contrl).attr("id").split("_")[1];
        var targetImage = $('#pdPicture_' + tergetIndex).attr('src');
        var targetName = $('#pdName_' + tergetIndex).html();
        var targetPrice = $('#pdPrice_' + tergetIndex).html();

        $('#lblCartCount').html(parseInt($('#lblCartCount').html())+1);

        var targetProduct =
        {
            Name: targetName,
            Image: targetImage,
            Price: targetPrice
        }
 
        lstCartProduct.push(targetProduct);
        localStorage.setItem("lstCartProduct", JSON.stringify(lstCartProduct));
        $('#lblCartCount').html(lstCartProduct.length);
        console.log("__________After Adding New Product_____________");
        console.log(lstCartProduct);
        alert("Product Added to Cart")
    },
    ViewCart: () => {
        //if (lstCartProduct.length > 0) {
        //    $.each(lstCartProduct, function (index, value) {
        //        $("#dvViewCart").append(`
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

        if (lstCartProduct.length > 0) {
            $("#dvViewCart").html('');
                $.each(lstCartProduct, function (index, value) {
                    $("#dvViewCart").append(`
            <div class="cart-item" style="clear:both; display:block; border:1px solid #fff; height:100px; width:100%;">
                <div class="row" style="padding:5px">
                    <div class="col-3">
                        <img src="${value.Image}" alt="${value.Name}" style="height:40px; width:40px;" />
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span>${value.Name}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center">
                        <span>${value.Price}</span>
                    </div>
                    <div class="col-3 d-flex align-items-center justify-content-end">
                        <span style="cursor:pointer; color:red;">X</span>
                    </div>
                </div>
            </div>
        `);
                });
        }
    



               //this is with raw css no animation
        //if ($("#dvViewCart").css("right") == "0" || $("#dvViewCart").css("right") == "0px") {
        //    $("#dvViewCart").css("right", parseInt($("#dvViewCart").css("right").replace("px", "")) - 300);
        //}
        //else {
        //    $("#dvViewCart").css("right", parseInt($("#dvViewCart").css("right").replace("px", "")) + 300);
        //}
        if ($("#dvViewCart").css("right") == "0" || $("#dvViewCart").css("right") == "0px") {
            $("#dvViewCart").animate({
                right: "-300"
            }, "fast");
        }
        else {
            $("#dvViewCart").animate({
                right: "0"
            }, "slow");        }

        
    },

}