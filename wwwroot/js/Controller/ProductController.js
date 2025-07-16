var ProductController = {
    LstProduct: () => {
        ProductService.LstProducts(function (response) {
            var productContent = "";
             $.each(response,function(index,value){
                productContent= productContent+`
                   <div class="col-sm-3" style="margin-top:10px">
                        <div class="thumb-wrapper">
                            <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
                            <div class="img-box">
                                 <img id="pdPicture_${index}" src="${value.picture}" class="img-fluid" alt="">
                            </div>
                            <div class="thumb-content text-center">
                                <h4 id="pdName_${index}">${value.name}</h4>
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
        var lstCartProduct = [];
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
    }

}