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
                                 <img src="${value.picture}" class="img-fluid" alt="">
                            </div>
                            <div class="thumb-content text-center">
                                <h4>${value.name}</h4>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                        <p class="item-price"><strike>${value.price}</strike> <b>${value.price}</b></p>
                                        <a href="#" class="btn btn-secondary">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                `;
            })
            $('#productList').html(productContent);
        })
        
    }
}